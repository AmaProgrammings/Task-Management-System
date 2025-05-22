
import { useState, useEffect } from "react";
import { Task, TaskFormData, TaskStatus } from "@/types/task";
import { 
  createTask, 
  filterTasks, 
  sortTasks, 
  SortCriteria 
} from "@/utils/taskUtils";
import { Button } from "./ui/button";
import TaskList from "./TaskList";
import TaskFilterBar from "./TaskFilterBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import TaskForm from "./TaskForm";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface TaskManagerProps {
  initialTasks?: Task[];
}

const TaskManager = ({ initialTasks = [] }: TaskManagerProps) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Filtering and sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("createdAt");
  const [sortAscending, setSortAscending] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TaskStatus[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Create a new task
  const handleCreateTask = (taskData: TaskFormData) => {
    const newTask = createTask(taskData);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Task created",
      description: "Your task has been created successfully",
    });
  };

  // Edit an existing task
  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditDialogOpen(true);
    }
  };

  // Update an existing task
  const handleUpdateTask = (taskData: TaskFormData) => {
    if (!editingTask) return;
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
    
    setEditingTask(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    });
  };

  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully",
    });
  };

  // Update task status
  const handleUpdateStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast({
      title: "Status updated",
      description: `Task status changed to ${newStatus.replace("-", " ")}`,
    });
  };

  // Handle sort change
  const handleSortChange = (criteria: SortCriteria, ascending: boolean) => {
    setSortCriteria(criteria);
    setSortAscending(ascending);
  };

  // Apply filters and sorting
  const filteredAndSortedTasks = sortTasks(
    filterTasks(tasks, statusFilter, searchTerm),
    sortCriteria,
    sortAscending
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TaskFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortCriteria={sortCriteria}
        sortAscending={sortAscending}
        onSortChange={handleSortChange}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <TaskList
        tasks={filteredAndSortedTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Create Task Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              initialValues={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setIsEditDialogOpen(false)}
              submitLabel="Update Task"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManager;
