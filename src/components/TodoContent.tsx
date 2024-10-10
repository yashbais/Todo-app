import React, { useEffect, useState } from 'react'
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import TodoList from "./TodoList";
import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

interface todo {
    todo: string
}

interface Task {
    id: number;
    taskName: string;
}

const TodoContent = () => {

    const queryClient = useQueryClient()

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>("");

    const invalidatePreviousCached = () => {
        queryClient.invalidateQueries({ queryKey: ['api', 'todos'] })
    }

    const { data, isLoading ,error:queryError} = useQuery({
        queryKey: ['api', 'todos'],
        queryFn: () => { return axios.get("/api/todos") },
    });

    const mutationAdd = useMutation({
        mutationFn: (newTask: todo) => {
            return axios.post('/api/create', newTask);
        },
        onSuccess: () => {
            invalidatePreviousCached()
            setTask('');
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });

    const mutationDelete = useMutation({
        mutationFn: (id: number) => {
            return axios.delete(`/api/todos/${id}`);
        },
        onSuccess: () => {
            invalidatePreviousCached()
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });



    useEffect(() => {
        if (Array.isArray(data?.data)) {
            setTasks(data?.data);
        }
    }, [data])


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
        setError("");
    };

    const handleAdd = async () => {
        if (task.trim() === "") {
            setError("Task cannot be empty");
            return;
        }

        mutationAdd.mutate({ todo: task })
    };

    const handleDelete = async (id: number) => {
        mutationDelete.mutate(id)
    }

    const filteredTasks = tasks.filter((task) =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (queryError) {
        return <div>Error fetching tasks: {queryError.message}</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>

            <div className="flex items-center justify-between mb-4">
                <CustomInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    name="search"
                    type="text"
                />

            </div>

            <div className="flex justify-between mb-6 gap-5 items-baseline">
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

            {isLoading ?
                <div>Loading...</div> 
                :<TodoList tasks={filteredTasks} handleDelete={handleDelete} />}
        </div>
    )
}

export default TodoContent