import React from 'react';

const TaskModal = ({ show, onClose, onChange, onSubmit, task = {} }) => {
    if (!show) return null;

    const { title = '', description = '', status = 'To-Do', priority = 'Low', deadline = '' } = task;

    // Get today's date in yyyy-mm-dd format
    const today = new Date().toISOString().split('T')[0];

    // Format the date to dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB').format(date); // 'en-GB' locale formats date to dd/mm/yyyy
    };

    // Parse the date from yyyy-mm-dd to dd/mm/yyyy for display
    const parseDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-').map(Number);
        return new Intl.DateTimeFormat('en-GB').format(new Date(year, month - 1, day)); // 'en-GB' locale formats date to dd/mm/yyyy
    };

    // Format deadline for display in the date input
    const formattedDeadline = deadline ? deadline.split('T')[0] : '';

    // Define classes for priority based on its value
    const priorityClasses = {
        Low: 'border-green-500 text-green-500',
        Medium: 'border-yellow-500 text-yellow-500',
        High: 'border-red-500 text-red-500',
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">{task._id ? 'Edit Task' : 'Add Task'}</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            placeholder="Enter task title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            placeholder="Enter task description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={status}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={priority}
                            onChange={onChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${priorityClasses[priority]}`}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formattedDeadline}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min={today}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            {task._id ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
