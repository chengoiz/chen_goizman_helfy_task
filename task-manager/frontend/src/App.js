
import React, { useState, useEffect } from 'react';
import './styles/main.css';
import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add task
  async function handleAdd(task) {
    setFormLoading(true);
    try {
      const newTask = await createTask(task);
      setTasks(t => [...t, newTask]);
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  }

  // Edit task
  async function handleEdit(task) {
    setFormLoading(true);
    try {
      const updated = await updateTask(editing.id, task);
      setTasks(t => t.map(x => x.id === updated.id ? updated : x));
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  }

  // Delete task
  async function handleDelete(id) {
    if (!window.confirm('Delete this task?')) return;
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks(t => t.filter(x => x.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Toggle completed
  async function handleToggle(id) {
    setLoading(true);
    try {
      const updated = await toggleTask(id);
      setTasks(t => t.map(x => x.id === updated.id ? updated : x));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Start editing
  function startEdit(task) {
    setEditing(task);
  }

  // Filtered tasks
  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed
  );

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskForm
        onSubmit={editing ? handleEdit : handleAdd}
        initial={editing}
        loading={formLoading}
      />
      <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        filter={filter}
        onToggle={handleToggle}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
