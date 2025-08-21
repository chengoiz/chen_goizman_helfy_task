import React from 'react';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item${task.completed ? ' completed' : ''}`}>  
      <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      <div className="task-main">
        <span className="task-title">{task.title}</span>
        <span className="task-desc">{task.description}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>{task.completed ? 'Undo' : 'Done'}</button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
      <span className="created-at">{new Date(task.createdAt).toLocaleString()}</span>
    </div>
  );
}

export default TaskItem;
