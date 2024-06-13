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
        [HttpGet]
        public IEnumerable<TrainRoute>? GetAllRoutes()
        {
            return RoutesDB.routes;
        }

        [HttpPost]
        public IActionResult PostGraph([FromBody] Graph graph)
        {

            // Imprimir el objeto graph en la consola
            Console.WriteLine("Graph received:");
            graph.PrintGraph();
            //Console.WriteLine($"Nodes: {string.Join(", ", graph.nodes)}");
            //Console.WriteLine($"Links: {string.Join(", ", graph.links)}");

            // Procesar los datos del grafo
            // Por ejemplo, guardarlos en una base de datos o realizar alguna operación con ellos

            return Ok(new { message = "Graph received successfully.", graph });
        }
    }
}

