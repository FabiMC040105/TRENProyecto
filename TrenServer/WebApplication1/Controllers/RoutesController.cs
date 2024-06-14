using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entities;
using System.Collections.Generic;
using WebApplication1.DataStructures;
using System.Text.Json;
using System.Text;
using System.IO;
using System.Xml;
using static System.Net.Mime.MediaTypeNames;


namespace WebApplication1.Controllers
{
    [Route("api/Rutas")]
    [ApiController]
    
    public class RoutesController : ControllerBase
    {
        private static Graph grafo;

        static RoutesController()
        {
            // Inicializar el grafo una vez en el constructor estático
            grafo = new Graph();

            // Nodos del grafo
            var nodes = new[] {
                "Santo Domingo", "Tibás", "San José", "Zapote", "Tres Ríos",
                "Cartago", "Paraíso", "Heredia", "San Pedro", "Sabanilla",
                "Curridabat", "Guadalupe", "Moravia"
            };

            // Aristas del grafo con pesos
            var links = new (string from, string to, int weight)[] {
                ("Santo Domingo", "Heredia", 4), ("Santo Domingo", "Tibás", 3),
                ("Heredia", "Santo Domingo", 4), ("Tibás", "San José", 3),
                ("Tibás", "Santo Domingo", 3), ("Moravia", "Tibás", 4),
                ("Moravia", "Guadalupe", 2), ("Guadalupe", "Moravia", 2),
                ("Guadalupe", "San Pedro", 2), ("Sabanilla", "Guadalupe", 3),
                ("Sabanilla", "San Pedro", 4), ("Sabanilla", "San José", 6),
                ("San Pedro", "Guadalupe", 2), ("San Pedro", "San José", 3),
                ("Curridabat", "San Pedro", 4), ("Curridabat", "Tres Ríos", 7),
                ("Tres Ríos", "Sabanilla", 8), ("Tres Ríos", "Curridabat", 7),
                ("Tres Ríos", "Zapote", 8), ("Tres Ríos", "Cartago", 11),
                ("San José", "San Pedro", 3), ("San José", "Tibás", 3),
                ("San José", "Zapote", 4), ("Zapote", "San José", 4),
                ("Zapote", "Tres Ríos", 8), ("Cartago", "Tres Ríos", 11),
                ("Cartago", "Paraíso", 8), ("Paraíso", "Cartago", 8)
            };

            // Agregar nodos al grafo
            foreach (var node in nodes)
            {
                grafo.AddVertex(node);
            }

            // Agregar aristas al grafo con pesos
            foreach (var (from, to, weight) in links)
            {
                grafo.AddEdge(from, to, weight);
            }
        }
       
        private double calcularprecio(TicketPurchaseRequest request)
        {
            // Calcular la ruta más corta usando Dijkstra
            var (distance, path) = grafo.Dijkstra(request.Origen, request.Destino);

            // Calcular el precio total
            double precioBase = 25; // Precio base por kilometro
            double precioTotal = 0;

            if (request.Cantidad > 1)
            {
                // Calcular el descuento
                double descuento = 0.02 * (request.Cantidad - 1);
                if (descuento > 0.9) descuento = 0.9;

                // Aplicar el descuento
                precioTotal = request.Cantidad * precioBase * distance * (1 - descuento);
            }
            else
            {
                precioTotal = request.Cantidad * precioBase * distance;
            }

            return precioTotal;
        }

        [HttpGet]
        public IEnumerable<TrainRoute>? GetAllRoutes()
        {
            return RoutesDB.routes;
        }

        [HttpGet("reservations")]
        public IActionResult GetReservations()
        {
            // Ruta al archivo JSON
            string Path = "C:\\Users\\Aless\\OneDrive\\Escritorio\\TRENProyecto\\TrenServer\\WebApplication1\\Compras";

            if (!System.IO.File.Exists(Path))
            {
                return NotFound("El archivo Compras.json no se encuentra.");
            }

            var jsonData = System.IO.File.ReadAllText(Path);
            var compras = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Compra>>(jsonData);

            return Ok(compras);
        }

        [HttpPost]
        public IActionResult PostTicketPurchase([FromBody] TicketPurchaseRequest request)
        {
            if (string.IsNullOrEmpty(request.Origen) || string.IsNullOrEmpty(request.Destino))
            {
                return BadRequest("Origen y destino son requeridos.");
            }

            // Calcular la ruta más corta usando Dijkstra
            var (distance, path) = grafo.Dijkstra(request.Origen, request.Destino);

            if (path == null)
            {
                return NotFound("No se encontró una ruta entre los nodos especificados.");
            }

            // Calcular el precio total
            double precioTotal = calcularprecio(request);
            string Path = "C:\\Users\\Aless\\OneDrive\\Escritorio\\TRENProyecto\\TrenServer\\WebApplication1\\Compras";
            var Json = new JsonFile();
            string cant = request.Cantidad.ToString();
            string precio = precioTotal.ToString();
            Json.TicketPurchaseJson(request.Origen, request.Destino, request.Fecha, cant, string.Join(" -> ", path), precio, Path);

            return Ok(new
            {
                message = "Compra realizada con éxito.",
                Origen = request.Origen,
                Destino = request.Destino,
                Fecha = request.Fecha,
                Cantidad = request.Cantidad,
                precioTotal = precioTotal,
                distancia = distance,
                ruta = string.Join(" -> ", path)
            });
        }
    }


    public class Compra
    {
        public string Origen { get; set; }
        public string Destino { get; set; }
        public string Fecha { get; set; }
        public int Cantidad { get; set; }
        public string Ruta { get; set; }
        public int Costo { get; set; }
    }



    public class TicketPurchaseRequest
    {
        public string Origen { get; set; }
        public string Destino { get; set; }
        public string Fecha { get; set; }
        public int Cantidad { get; set; }

    }

    public class TicketPurchase
    {
        public string Origen { get; set; }
        public string Destino { get; set; }
        public string Fecha { get; set; }
        public string Cantidad { get; set; }
        public string Ruta { get; set; }
        public string Costo { get; set; }

    }

    public class JsonFile
    {
        public int TicketPurchaseJson(string origen, string destino, string fecha, string cantidad, string ruta, string costo, string filePath)
        {
            try
            {
                // Leer el contenido actual del archivo JSON
                string jsonString = File.Exists(filePath) ? File.ReadAllText(filePath) : "[]";

                List<TicketPurchase> ticketPurchases;

                // Deserializar el JSON en una lista de TicketPurchase
                try
                {
                    ticketPurchases = JsonSerializer.Deserialize<List<TicketPurchase>>(jsonString);
                }
                catch (JsonException)
                {
                    ticketPurchases = new List<TicketPurchase>();
                }

                // Crear un nuevo objeto TicketPurchase y añadirlo a la lista
                var newTicketPurchase = new TicketPurchase
                {
                    Origen = origen,
                    Destino = destino,
                    Fecha = fecha,
                    Cantidad = cantidad,
                    Ruta = ruta,
                    Costo = costo
                };
                ticketPurchases.Add(newTicketPurchase);

                // Serializar la lista actualizada a un string JSON
                var options = new JsonSerializerOptions { WriteIndented = true, Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping };
                string updatedJsonString = JsonSerializer.Serialize(ticketPurchases, options);

                // Escribir el nuevo JSON en el archivo
                File.WriteAllText(filePath, updatedJsonString, Encoding.UTF8);

                return 0; // Indicar éxito
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocurrió un error: {ex.Message}");
                return -1; // Indicar error
            }
        }
    }
}

