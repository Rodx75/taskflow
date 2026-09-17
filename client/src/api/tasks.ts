import type { Task, UpsertTaskInput } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5020/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export const tasksApi = {
  list: () => request<Task[]>("/tasks"),
  create: (input: UpsertTaskInput) =>
    request<Task>("/tasks", { method: "POST", body: JSON.stringify(input) }),
  update: (id: number, input: UpsertTaskInput) =>
    request<void>(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(input) }),
  toggle: (id: number) => request<Task>(`/tasks/${id}/toggle`, { method: "PATCH" }),
  remove: (id: number) => request<void>(`/tasks/${id}`, { method: "DELETE" }),
};
