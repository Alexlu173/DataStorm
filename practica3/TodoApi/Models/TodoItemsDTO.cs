namespace TodoApi.Models;

public class TodoItemDTO
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public List<string>? Categorias { get; set; }
    public List<string>? Prioridad { get; set; }
}