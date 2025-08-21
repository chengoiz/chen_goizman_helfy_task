import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, loading, error, filter, onToggle, onEdit, onDelete }) {
  const displayTasks = tasks;
  
  if (loading) {
    return <div className="task-list-loading">Loading tasks...</div>;
  }
  
  if (error) {
    return <div className="task-list-error">Error: {error}</div>;
  }
  
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <h3>No tasks found</h3>
        <p>
          {filter === 'completed' && 'No completed tasks yet.'}
          {filter === 'pending' && 'No pending tasks yet.'}
          {filter === 'all' && 'Create your first task above!'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="task-list-container">
      <div className="task-carousel">
        <div className="task-carousel-track">
          {displayTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
