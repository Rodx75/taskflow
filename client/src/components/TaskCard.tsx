import type { Task } from "../types";

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function TaskCard({ task, onToggle, onDelete }: Props) {
  const dueDate = formatDate(task.dueDate);
  const isOverdue = !task.isCompleted && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <article className={`task-card task-card--${task.priority.toLowerCase()} ${task.isCompleted ? "task-card--done" : ""}`}>
      <div className="task-card__top">
        <button
          type="button"
          className="task-card__checkbox"
          aria-label={task.isCompleted ? "Mark as pending" : "Mark as done"}
          onClick={() => onToggle(task.id)}
        >
          {task.isCompleted ? "✓" : ""}
        </button>
        <div className="task-card__body">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <div className="task-card__meta">
            <span className="tag">{task.category}</span>
            <span className={`tag tag--priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
            {dueDate && (
              <span className={`tag tag--date ${isOverdue ? "tag--overdue" : ""}`}>
                Due {dueDate}
              </span>
            )}
          </div>
        </div>
        <button type="button" className="task-card__delete" aria-label="Delete task" onClick={() => onDelete(task.id)}>
          ×
        </button>
      </div>
    </article>
  );
}
