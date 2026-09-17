using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Models;

namespace TaskFlow.Api.Data;

public class TaskFlowContext(DbContextOptions<TaskFlowContext> options) : DbContext(options)
{
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>().HasData(
            new TaskItem
            {
                Id = 1,
                Title = "Design the database schema",
                Description = "Define entities, relationships and constraints for TaskFlow.",
                Category = "Planning",
                Priority = TaskPriority.High,
                IsCompleted = true,
                CreatedAt = new DateTime(2026, 9, 1, 9, 0, 0, DateTimeKind.Utc)
            },
            new TaskItem
            {
                Id = 2,
                Title = "Build the Tasks REST API",
                Description = "CRUD endpoints with ASP.NET Core and EF Core.",
                Category = "Backend",
                Priority = TaskPriority.High,
                IsCompleted = true,
                CreatedAt = new DateTime(2026, 9, 3, 9, 0, 0, DateTimeKind.Utc)
            },
            new TaskItem
            {
                Id = 3,
                Title = "Connect the React frontend",
                Description = "Fetch tasks from the API and render the board.",
                Category = "Frontend",
                Priority = TaskPriority.Medium,
                IsCompleted = false,
                DueDate = new DateTime(2026, 9, 20, 0, 0, 0, DateTimeKind.Utc),
                CreatedAt = new DateTime(2026, 9, 5, 9, 0, 0, DateTimeKind.Utc)
            },
            new TaskItem
            {
                Id = 4,
                Title = "Write the README",
                Description = "Document setup steps and add screenshots.",
                Category = "Docs",
                Priority = TaskPriority.Low,
                IsCompleted = false,
                CreatedAt = new DateTime(2026, 9, 6, 9, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
