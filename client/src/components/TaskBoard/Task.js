import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './constants';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Task = ({ task, onEdit, onDelete }) => {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id: task._id, status: task.status },
    });

    // Define classes for priority based on its value
    const priorityClasses = {
        Low: 'text-green-500 font-bold',
        Medium: 'text-yellow-500 font-bold',
        High: 'text-red-500 font-bold',
    };

    return (
        <div ref={drag} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className={`${priorityClasses[task.priority]}`}>
                {task.priority}
            </p>
            <p>{new Date(task.deadline).toLocaleDateString()}</p>
            <div className="flex justify-between items-center mt-2">
                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Edit"
                >
                    <FaEdit size={20} />
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete"
                >
                    <FaTrashAlt size={20} />
                </button>
            </div>
        </div>
    );
};

export default Task;
