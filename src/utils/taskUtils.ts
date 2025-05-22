
import { Task, TaskFormData, TaskPriority, TaskStatus } from "../types/task";

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create a new task
export const createTask = (taskData: TaskFormData): Task => {
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    priority: taskData.priority,
    dueDate: taskData.dueDate,
    createdAt: now
  };
};

// Get priority color class based on priority
export const getPriorityColorClass = (priority: TaskPriority): string => {
  switch (priority) {
    case "high":
      return "bg-rose-500";
    case "medium":
      return "bg-amber-500";
    case "low":
      return "bg-emerald-600";
    default:
      return "bg-slate-500";
  }
};

// Get status text based on status
export const getStatusText = (status: TaskStatus): string => {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return "Unknown";
  }
};

// Get status color class based on status
export const getStatusColorClass = (status: TaskStatus): string => {
  switch (status) {
    case "todo":
      return "bg-slate-500";
    case "in-progress":
      return "bg-blue-500";
    case "completed":
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
};

// Format a date to a readable format
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Sort tasks by criteria
export type SortCriteria = "dueDate" | "priority" | "createdAt" | "title";

export const sortTasks = (tasks: Task[], criteria: SortCriteria, ascending: boolean = true): Task[] => {
  const sortedTasks = [...tasks];
  
  sortedTasks.sort((a, b) => {
    if (criteria === "priority") {
      const priorities: Record<TaskPriority, number> = {
        "high": 3,
        "medium": 2,
        "low": 1
      };
      return ascending 
        ? priorities[a.priority] - priorities[b.priority]
        : priorities[b.priority] - priorities[a.priority];
    }
    
    if (criteria === "dueDate") {
      // Handle null dates
      if (!a.dueDate) return ascending ? 1 : -1;
      if (!b.dueDate) return ascending ? -1 : 1;
      
      return ascending 
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    
    if (criteria === "createdAt") {
      return ascending 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
    if (criteria === "title") {
      return ascending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    
    return 0;
  });
  
  return sortedTasks;
};

// Filter tasks by status and search term
export const filterTasks = (tasks: Task[], statuses: TaskStatus[], searchTerm: string): Task[] => {
  return tasks.filter(task => {
    const matchesStatus = statuses.length === 0 || statuses.includes(task.status);
    const matchesSearch = !searchTerm || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
};
