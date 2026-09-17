import { useEffect, useMemo, useState } from "react";
import { tasksApi } from "./api/tasks";
import { FilterBar } from "./components/FilterBar";
import { TaskCard } from "./components/TaskCard";
import { TaskForm } from "./components/TaskForm";
import type { Task, UpsertTaskInput } from "./types";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activeCategory, setActiveCategory] = useState("All");
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    tasksApi
      .list()
      .then((data) => {
        setTasks(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.category))).sort(),
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (activeCategory !== "All" && t.category !== activeCategory) return false;
      if (hideCompleted && t.isCompleted) return false;
      return true;
    });
  }, [tasks, activeCategory, hideCompleted]);

  const doneCount = tasks.filter((t) => t.isCompleted).length;

  async function handleCreate(input: UpsertTaskInput) {
    const created = await tasksApi.create(input);
    setTasks((prev) => [...prev, created]);
  }

  async function handleToggle(id: number) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    try {
      await tasksApi.toggle(id);
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    }
  }

  async function handleDelete(id: number) {
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await tasksApi.remove(id);
    } catch {
      setTasks(previous);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>TaskFlow</h1>
          <p>React + TypeScript frontend · ASP.NET Core + SQLite backend</p>
        </div>
        <div className="app__stats">
          <span>{doneCount}</span> / {tasks.length} done
        </div>
      </header>

      <TaskForm onSubmit={handleCreate} categories={categories} />

      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        hideCompleted={hideCompleted}
        onHideCompletedChange={setHideCompleted}
      />

      {status === "loading" && <p className="app__state">Loading tasks…</p>}
      {status === "error" && (
        <p className="app__state app__state--error">
          Couldn't reach the API. Make sure the backend is running on port 5020.
        </p>
      )}

      {status === "ready" && (
        <div className="task-list">
          {visibleTasks.length === 0 && <p className="app__state">No tasks here yet.</p>}
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
