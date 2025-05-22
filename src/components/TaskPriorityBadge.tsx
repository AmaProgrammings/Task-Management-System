
import { cn } from "@/lib/utils";
import { TaskPriority } from "@/types/task";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

const TaskPriorityBadge = ({ priority, className }: TaskPriorityBadgeProps) => {
  const getPriorityLabel = () => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Unknown";
    }
  };

  const getPriorityColorClass = () => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium border",
        getPriorityColorClass(),
        className
      )}
    >
      {getPriorityLabel()}
    </span>
  );
};

export default TaskPriorityBadge;
