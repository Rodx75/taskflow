export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  category: string;
  priority: Priority;
  isCompleted: boolean;
  dueDate: string | null;
  createdAt: string;
}

export interface UpsertTaskInput {
  title: string;
  description: string | null;
  category: string;
  priority: Priority;
  isCompleted: boolean;
  dueDate: string | null;
}
