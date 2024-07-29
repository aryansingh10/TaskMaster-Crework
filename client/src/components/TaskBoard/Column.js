import React from 'react';
import Task from './Task';

const Column = ({ title, tasks, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {tasks.map((task) => (
                <Task key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default Column;
