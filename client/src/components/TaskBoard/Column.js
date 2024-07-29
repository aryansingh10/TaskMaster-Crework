// src/components/TaskBoard/Column.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './constants';
import Task from './Task';

const Column = ({ title, tasks, onEdit, onDelete, onMoveTask }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            // Update task status and call the onMoveTask function
            onMoveTask(item.id, title);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`bg-white rounded-lg shadow-md p-4 ${isOver ? 'bg-blue-100' : ''}`}>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {tasks.map(task => (
                <Task key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default Column;
