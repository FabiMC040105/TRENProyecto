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

        public Graph grafo = new Graph();


        [HttpGet]
        public IEnumerable<TrainRoute>? GetAllRoutes()
        {
            return RoutesDB.routes;
        }

        [HttpPost]
        public IActionResult PostGraph([FromBody] Graph graph)
        {
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

            // Imprimir el grafo
            grafo.PrintGraph();

            // Ejemplo de uso del algoritmo de Dijkstra
            var (distance, path) = grafo.Dijkstra("Santo Domingo", "Cartago");
            if (path != null)
            {
                Console.WriteLine($"Shortest path from Santo Domingo to Cartago: {string.Join(" -> ", path)} with distance {distance}");
            }
            else
            {
                Console.WriteLine("No path found from Santo Domingo to Cartago");
            }

            return Ok(new { message = "Graph received successfully.", graph });
        }
    }
}

