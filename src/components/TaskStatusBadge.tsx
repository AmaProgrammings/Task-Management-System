
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/task";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const TaskStatusBadge = ({ status, className }: TaskStatusBadgeProps) => {
  const getStatusLabel = () => {
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

  const getStatusColorClass = () => {
    switch (status) {
      case "todo":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium border",
        getStatusColorClass(),
        className
      )}
    >
      {getStatusLabel()}
    </span>
  );
};

export default TaskStatusBadge;
