namespace TodoApi.Models;

public class TodoItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; }
    public List<string>? Categorias { get; set; }
    public List<string>? Prioridad { get; set; }
}