import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import TodoList from "./TodoList";

interface Task {
  id: number;
  taskName: string;
}

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch initial tasks from the mock API
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/todos");  
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
    } catch (error) {
      setTasks([]);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  

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
  const handleAdd = async () => {
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return; // Prevent adding the task
    }

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: task }), // Sending task data as JSON
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, createdTask]);
        setTask(""); // Reset the input
      } else {
        setError("Failed to add task");
      }
    } catch (error) {
      setError("Failed to add task");
    }
  };

  // Function to handle deleting a task
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        fetchTasks();
      } else {
        try {
          const errorData = await response.json();
          setError(`Failed to delete task: ${errorData.msg || "Unknown error"}`);
        } catch (error) {
          setError("Failed to delete task: Unable to parse error message.");
        }
      }
    } catch (error) {
      setError("Failed to delete task due to a network or server error.");
    }
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
