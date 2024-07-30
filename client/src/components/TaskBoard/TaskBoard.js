import React, { useState, useEffect } from 'react';
import api from '../../api'; 
import Column from './Column';

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    priority: 'Medium',
    deadline: ''
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({
        title: '',
        description: '',
        status: 'To-Do',
        priority: 'Medium',
        deadline: ''
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const renderColumn = (status) => (
    <Column key={status} status={status}>
      {tasks.filter(task => task.status === status).map(task => (
        <div key={task._id} className="task-card">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <p className="task-status">{task.status}</p>
        </div>
      ))}
    </Column>
  );

  return (
    <div className="taskboard">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-end mb-4">
        <button 
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => document.getElementById('add-task-form').classList.toggle('hidden')}
        >
          Add New Task
        </button>
      </div>
      <form id="add-task-form" onSubmit={handleSubmit} className="mb-8 hidden">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2 p-2 border rounded"
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={newTask.deadline}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Task</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['To-Do', 'In Progress', 'Under Review', 'Completed'].map(renderColumn)}
      </div>
    </div>
  );
}

export default TaskBoard;
