using System.ComponentModel.DataAnnotations;
using TaskFlow.Api.Models;

namespace TaskFlow.Api.DTOs;

public record TaskItemDto(
    int Id,
    string Title,
    string? Description,
    string Category,
    TaskPriority Priority,
    bool IsCompleted,
    DateTime? DueDate,
    DateTime CreatedAt
);

public class UpsertTaskDto
{
    [Required, MaxLength(120)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    [Required, MaxLength(40)]
    public string Category { get; set; } = "General";

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public bool IsCompleted { get; set; }

    public DateTime? DueDate { get; set; }
}
