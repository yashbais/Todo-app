import React from "react";
import CustomButton from "./CustomButton";

interface Task {
  id: number;
  taskName: string;
}

interface TodoListProps {
  tasks: Task[];
  handleDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, handleDelete }) => {
  return (
    <div className="mt-6">
      {/* Conditional rendering for empty list */}
      {!tasks.length ? (
        <p className="text-gray-500 text-center">No tasks available. Add tasks to your to-do list.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex justify-between items-center"
            >
              <h4 className="text-lg font-medium">{task.taskName}</h4>

              {/* Button for deleting task */}
              <CustomButton
                label="Delete"
                onClick={() => handleDelete(task.id)}
                type="delete"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
