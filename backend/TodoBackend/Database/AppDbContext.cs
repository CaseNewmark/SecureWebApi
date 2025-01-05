using Microsoft.EntityFrameworkCore;
using TodoBackend.Models;

namespace TodoBackend.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> contextOptions) : base(contextOptions)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; }
}