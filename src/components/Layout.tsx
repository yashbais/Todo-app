import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import TodoList from "./TodoList";

interface Task {
  id: number;
  taskName: string;
}

const initialTasks: Task[] = [
  { id: 1, taskName: "Create project" },
  { id: 2, taskName: "Update documentation" },
];

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [error, setError] = useState<string>("");

  // Handle input change for search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle input change for new task
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    setError("");
  };

  // Function to handle adding a task
  const handleAdd = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return; // Prevent adding the task
    }

    const newTask: Task = {
      id: tasks.length + 1,
      taskName: task,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Function to handle deleting a task
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to handle clear search
  const handleClear = () => {
    setSearchQuery("");
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-5 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

      {/* Search Input */}
      <div className="mt-4 text-center flex items-baseline justify-evenly">
        <CustomInput
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          name="search"
          type="text"
        />
        <CustomButton
          label="Clear"
          onClick={handleClear}
          type="clear"
          disabled={!searchQuery} // Disable button if searchQuery is empty
        />
      </div>

      {/* Adding tasks */}
      <div className="mt-4 text-center flex items-baseline justify-evenly">
        <CustomInput
          placeholder="Add task..."
          value={task}
          onChange={handleTaskChange}
          name="task"
          type="text"
          error={error}
        />
        <CustomButton label="Add" onClick={handleAdd} type="add" />
      </div>

      {/* Pass filtered tasks to TodoList */}
      <TodoList tasks={filteredTasks} handleDelete={handleDelete} />
    </div>
  );
};

export default Layout;
