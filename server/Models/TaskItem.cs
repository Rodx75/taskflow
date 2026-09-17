using System.ComponentModel.DataAnnotations;

namespace TaskFlow.Api.Models;

public class TaskItem
{
    public int Id { get; set; }

    [Required, MaxLength(120)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    [Required, MaxLength(40)]
    public string Category { get; set; } = "General";

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public bool IsCompleted { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
