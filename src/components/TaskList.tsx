
import { Card, CardContent } from "@/components/ui/card";
import { Task, TaskStatus } from "@/types/task";
import TaskPriorityBadge from "./TaskPriorityBadge";
import TaskStatusBadge from "./TaskStatusBadge";
import { formatDate } from "@/utils/taskUtils";
import { Check, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

const TaskList = ({ tasks, onEditTask, onDeleteTask, onUpdateStatus }: TaskListProps) => {
  const handleStatusChange = (taskId: string, currentStatus: TaskStatus) => {
    // Cycle through statuses: todo -> in-progress -> completed -> todo
    let newStatus: TaskStatus;
    
    switch (currentStatus) {
      case "todo":
        newStatus = "in-progress";
        break;
      case "in-progress":
        newStatus = "completed";
        break;
      case "completed":
        newStatus = "todo";
        break;
      default:
        newStatus = "todo";
    }
    
    onUpdateStatus(taskId, newStatus);
  };
  
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-muted-foreground">No tasks found</h3>
          <p className="text-sm text-muted-foreground mt-2">Create a new task to get started</p>
        </div>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} className="hover-scale">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <h3 className="text-lg font-medium">{task.title}</h3>
                    <div className="flex gap-2">
                      <TaskPriorityBadge priority={task.priority} />
                      <TaskStatusBadge status={task.status} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {task.description || "No description"}
                  </p>
                  
                  {task.dueDate && (
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mt-4 sm:mt-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleStatusChange(task.id, task.status)}
                    title="Change status"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEditTask(task.id)}
                    title="Edit task"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDeleteTask(task.id)}
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TaskList;
