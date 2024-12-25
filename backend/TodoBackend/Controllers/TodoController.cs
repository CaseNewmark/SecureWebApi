using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TodoBackend.Database;
using TodoBackend.Models;

namespace TodoBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize] // Ensure the user is authenticated
public class TodoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TodoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return await _context.TodoItems.Where(t => t.UserId == userId).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoById(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var todoItem = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (todoItem == null)
        {
            return NotFound();
        }

        return todoItem;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem todoItem)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        todoItem.UserId = userId; // Set the UserId

        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodoById), new { id = todoItem.Id }, todoItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodoItem(int id, TodoItem todoItem)
    {
        if (id != todoItem.Id)
        {
            return BadRequest();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (todoItem.UserId != userId)
        {
            return Unauthorized();
        }

        _context.Entry(todoItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoItemExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var todoItem = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return _context.TodoItems.Any(e => e.Id == id && e.UserId == userId);
    }
}