
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SortCriteria } from "@/utils/taskUtils";
import { TaskStatus } from "@/types/task";
import { ChevronDown, ListFilter, Search } from "lucide-react";
import { useState } from "react";

interface TaskFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortCriteria: SortCriteria;
  sortAscending: boolean;
  onSortChange: (criteria: SortCriteria, ascending: boolean) => void;
  statusFilter: TaskStatus[];
  onStatusFilterChange: (statuses: TaskStatus[]) => void;
}

const TaskFilterBar = ({
  searchTerm,
  onSearchChange,
  sortCriteria,
  sortAscending,
  onSortChange,
  statusFilter,
  onStatusFilterChange,
}: TaskFilterBarProps) => {
  const [searchValue, setSearchValue] = useState(searchTerm);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchValue);
  };

  const handleStatusToggle = (status: TaskStatus) => {
    const newFilter = [...statusFilter];
    const index = newFilter.indexOf(status);
    
    if (index > -1) {
      newFilter.splice(index, 1);
    } else {
      newFilter.push(status);
    }
    
    onStatusFilterChange(newFilter);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end justify-between mb-6">
      <form onSubmit={handleSearchSubmit} className="flex-1">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex items-center space-x-2">
          <Label htmlFor="sort-by" className="whitespace-nowrap">
            Sort by
          </Label>
          <Select
            value={sortCriteria}
            onValueChange={(value) => onSortChange(value as SortCriteria, sortAscending)}
          >
            <SelectTrigger className="w-[160px]" id="sort-by">
              <SelectValue placeholder="Select criteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange(sortCriteria, !sortAscending)}
        >
          {sortAscending ? "Ascending" : "Descending"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter className="h-4 w-4 mr-2" />
              Filter Status
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Task Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("todo")}
              onCheckedChange={() => handleStatusToggle("todo")}
            >
              To Do
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("in-progress")}
              onCheckedChange={() => handleStatusToggle("in-progress")}
            >
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("completed")}
              onCheckedChange={() => handleStatusToggle("completed")}
            >
              Completed
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TaskFilterBar;
