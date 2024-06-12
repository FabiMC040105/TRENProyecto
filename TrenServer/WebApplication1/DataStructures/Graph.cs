namespace WebApplication1.DataStructures
{
    public class Node
    {
        public string id { get; set; }
    }

    public class Link
    {
        public string source { get; set; }
        public string target { get; set; }
    }

    public class Graph
    {
        public List<Node> nodes { get; set; }
        public List<Link> links { get; set; }
    }
}
