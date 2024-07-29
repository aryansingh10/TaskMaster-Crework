import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Task = ({ task, onDelete, onEdit }) => {
    return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                    <p>{task.priority}</p>
                    <p>{new Date(task.deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(task)} className="text-blue-500">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="text-red-500">
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;
