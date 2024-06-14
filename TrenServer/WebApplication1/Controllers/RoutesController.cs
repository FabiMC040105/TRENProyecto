using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entities;
using System.Collections.Generic;
using WebApplication1.DataStructures;


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
    public class TicketPurchaseRequest
    {
        public string Origen { get; set; }
        public string Destino { get; set; }
        public string Fecha { get; set; }
        public int Cantidad { get; set; }
    }
}

