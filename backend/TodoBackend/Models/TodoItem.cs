namespace TodoBackend.Models;

public class TodoItem
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public bool IsComplete { get; set; }
    public required string UserId { get; set; }
}