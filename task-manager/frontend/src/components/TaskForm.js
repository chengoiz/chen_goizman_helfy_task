import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initial, loading }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority || 'low');

  useEffect(() => {
    setTitle(initial?.title || '');
    setDescription(initial?.description || '');
    setPriority(initial?.priority || 'low');
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, priority });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={loading}
      />
      <select value={priority} onChange={e => setPriority(e.target.value)} disabled={loading}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" disabled={loading}>Save</button>
    </form>
  );
}

export default TaskForm;
