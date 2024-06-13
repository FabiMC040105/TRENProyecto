namespace WebApplication1.DataStructures
{
    // Clase que representa una arista (arco) en el grafo
    public class Edge
    {
        public Vertex From { get; }
        public Vertex To { get; }
        public int Weight { get; }

        public Edge(Vertex from, Vertex to, int weight)
        {
            From = from;
            To = to;
            Weight = weight;
        }
    }

    // Clase que representa un vértice (nodo) en el grafo
    public class Vertex
    {
        public string Name { get; }
        public List<Edge> Edges { get; }

        public Vertex(string name)
        {
            Name = name;
            Edges = new List<Edge>();
        }

        public void AddEdge(Vertex to, int weight)
        {
            Edges.Add(new Edge(this, to, weight));
        }

        public override string ToString()
        {
            return Name;
        }
    }

    // Clase que representa el grafo
    public class Graph
    {
        private readonly Dictionary<string, Vertex> _vertices;

        public Graph()
        {
            _vertices = new Dictionary<string, Vertex>();
        }

        public Vertex AddVertex(string name)
        {
            if (!_vertices.ContainsKey(name))
            {
                var vertex = new Vertex(name);
                _vertices[name] = vertex;
                return vertex;
            }

            return _vertices[name];
        }

        public void AddEdge(string from, string to, int weight)
        {
            if (!_vertices.ContainsKey(from) || !_vertices.ContainsKey(to))
            {
                throw new ArgumentException("Both vertices must be added to the graph before adding an edge.");
            }

            _vertices[from].AddEdge(_vertices[to], weight);
        }

        public Vertex GetVertex(string name)
        {
            return _vertices.TryGetValue(name, out var vertex) ? vertex : null;
        }

        public void PrintGraph()
        {
            foreach (var vertex in _vertices.Values)
            {
                Console.Write($"{vertex.Name}: ");
                foreach (var edge in vertex.Edges)
                {
                    Console.Write($"{edge.To.Name}({edge.Weight}) ");
                }
                Console.WriteLine();
            }
        }

        // Implementación del algoritmo de Dijkstra
        public (int distance, List<Vertex> path) Dijkstra(string start, string end)
        {
            if (!_vertices.ContainsKey(start) || !_vertices.ContainsKey(end))
            {
                throw new ArgumentException("Both start and end vertices must be in the graph.");
            }

            var distances = new Dictionary<Vertex, int>();
            var previous = new Dictionary<Vertex, Vertex>();
            var priorityQueue = new SortedSet<(int distance, Vertex vertex)>();

            foreach (var vertex in _vertices.Values)
            {
                distances[vertex] = int.MaxValue;
                previous[vertex] = null;
            }

            distances[_vertices[start]] = 0;
            priorityQueue.Add((0, _vertices[start]));

            while (priorityQueue.Count > 0)
            {
                var current = priorityQueue.Min.vertex;
                priorityQueue.Remove(priorityQueue.Min);

                if (current == _vertices[end])
                {
                    var path = new List<Vertex>();
                    while (previous[current] != null)
                    {
                        path.Insert(0, current);
                        current = previous[current];
                    }
                    path.Insert(0, _vertices[start]);
                    return (distances[_vertices[end]], path);
                }

                foreach (var edge in current.Edges)
                {
                    var newDist = distances[current] + edge.Weight;
                    if (newDist < distances[edge.To])
                    {
                        priorityQueue.Remove((distances[edge.To], edge.To));
                        distances[edge.To] = newDist;
                        previous[edge.To] = current;
                        priorityQueue.Add((newDist, edge.To));
                    }
                }
            }

            return (int.MaxValue, null); // No hay camino encontrado
        }
    }
}



