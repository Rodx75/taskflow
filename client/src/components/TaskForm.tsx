import { useState, type FormEvent } from "react";
import type { Priority, UpsertTaskInput } from "../types";

interface Props {
  onSubmit: (input: UpsertTaskInput) => Promise<void>;
  categories: string[];
}

const emptyForm = {
  title: "",
  description: "",
  category: "General",
  priority: "Medium" as Priority,
  dueDate: "",
};

export function TaskForm({ onSubmit, categories }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim() || null,
        category: form.category.trim() || "General",
        priority: form.priority,
        isCompleted: false,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      });
      setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          className="task-form__title"
          placeholder="New task title…"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          maxLength={120}
          required
        />
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? "Adding…" : "Add task"}
        </button>
      </div>

      <div className="task-form__row task-form__row--meta">
        <input
          className="task-form__description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength={500}
        />
        <input
          list="category-options"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          maxLength={40}
        />
        <datalist id="category-options">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>
    </form>
  );
}
