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

    // Parse the date from dd/mm/yyyy to yyyy-mm-dd
    const parseDate = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day).toISOString().split('T')[0];
    };

    // Format deadline for display
    const formattedDeadline = formatDate(deadline);

    // Log the current priority value to debug
    // Define classes for priority based on its value
    const priorityClasses = {
        Low: 'border-green-500 text-green-500',
        Medium: 'border-yellow-500 text-yellow-500',
        High: 'border-red-500 text-red-500',
    };
    console.log("Current Priority:", priority);



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
                            type="text"
                            name="deadline"
                            value={formattedDeadline}
                            onChange={(e) => {
                                const parsedDate = parseDate(e.target.value);
                                onChange({ target: { name: 'deadline', value: parsedDate } });
                            }}
                            placeholder="dd/mm/yyyy"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
