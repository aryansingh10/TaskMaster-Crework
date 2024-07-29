// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Column from '../components/TaskBoard/Column';
import TaskModal from '../components/TaskBoard/TaskModal';

const Dashboard = () => {
    const { authTokens } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const fetchTasks = async () => {
        if (!authTokens) {
            setError('No authentication token available');
            return;
        }

        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${authTokens}` },
            });
            setTasks(response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    useEffect(() => {
        if (!authTokens) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, [authTokens, navigate]);

    const handleAddTask = () => {
        setCurrentTask({
            title: '',
            description: '',
            status: 'To-Do',
            priority: 'Medium',
            deadline: ''
        });
        setEditMode(false);
        setShowModal(true);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setEditMode(true);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                const response = await api.put(`/tasks/${currentTask._id}`, currentTask, {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });
                setTasks(tasks.map(task => (task._id === response.data._id ? response.data : task)));
            } else {
                const response = await api.post('/tasks', currentTask, {
                    headers: { Authorization: `Bearer ${authTokens}` },
                });
                setTasks([...tasks, response.data]);
            }
            setShowModal(false);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${authTokens}` },
            });
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    const handleMoveTask = async (taskId, newStatus) => {
        try {
            const task = tasks.find(task => task._id === taskId);
            const updatedTask = { ...task, status: newStatus };
            
            // Update task status in the backend
            await api.put(`/tasks/${taskId}`, updatedTask, {
                headers: { Authorization: `Bearer ${authTokens}` },
            });

            // Update task status in the local state
            setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    const filteredTasks = {
        'To-Do': tasks.filter(task => task.status === 'To-Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Under Review': tasks.filter(task => task.status === 'Under Review'),
        'Completed': tasks.filter(task => task.status === 'Completed'),
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            >
                Add Task
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Column title="To-Do" tasks={filteredTasks['To-Do']} onEdit={handleEditTask} onDelete={handleDelete} onMoveTask={handleMoveTask} />
                <Column title="In Progress" tasks={filteredTasks['In Progress']} onEdit={handleEditTask} onDelete={handleDelete} onMoveTask={handleMoveTask} />
                <Column title="Under Review" tasks={filteredTasks['Under Review']} onEdit={handleEditTask} onDelete={handleDelete} onMoveTask={handleMoveTask} />
                <Column title="Completed" tasks={filteredTasks['Completed']} onEdit={handleEditTask} onDelete={handleDelete} onMoveTask={handleMoveTask} />
            </div>
            {showModal && (
                <TaskModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    task={currentTask}
                />
            )}
        </div>
    );
};

export default Dashboard;
