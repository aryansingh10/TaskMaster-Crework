import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './constants';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast'; 
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const Task = ({ task, onEdit, onDelete }) => {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id: task._id, status: task.status },
    });

    const priorityClasses = {
        Low: 'text-green-500 font-bold',
        Medium: 'text-yellow-500 font-bold',
        Urgent: 'text-red-500 font-bold',
    };

    const handleDelete = () => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        onDelete(task._id)
                            .then(() => {
                                toast.success('Task deleted successfully');
                            })
                            .catch(() => {
                                toast.error('Failed to delete task');
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div ref={drag} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className={`${priorityClasses[task.priority]}`}>
                {task.priority}
            </p>
            <p>{formatDate(task.deadline)}</p>
            <div className="flex justify-between items-center mt-2">
                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Edit"
                >
                    <FaEdit size={20} />
                </button>
                <button
                    onClick={handleDelete}
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
