import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from './api';

// PUBLIC_INTERFACE
function App() {
  /**
   * The main Todo application component.
   * - Fetches todos on mount and manages state
   * - Renders header, form, and list
   * - Wires CRUD handlers to the backend API
   */
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // initial load
    (async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
      } catch (e) {
        console.error(e);
        setErrMsg('Failed to load todos. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async (title, description) => {
    setErrMsg('');
    try {
      const newTodo = await createTodo({ title, description });
      setTodos((prev) => [newTodo, ...prev]);
    } catch (e) {
      console.error(e);
      setErrMsg('Failed to add todo.');
    }
  };

  const handleToggle = async (id, completed) => {
    setErrMsg('');
    try {
      const updated = await toggleTodo(id, completed);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      console.error(e);
      setErrMsg('Failed to update todo status.');
    }
  };

  const handleSave = async (id, data) => {
    setErrMsg('');
    try {
      const updated = await updateTodo(id, data);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      console.error(e);
      setErrMsg('Failed to save changes.');
    }
  };

  const handleDelete = async (id) => {
    setErrMsg('');
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
      setErrMsg('Failed to delete todo.');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" role="application">
      <header className="app-header">
        <div className="container header-inner">
          <h1 className="title" aria-label="Todo Application">Todo</h1>
          <div className="header-actions">
            <button
              className="btn btn-surface"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h2 className="section-title">Add a new task</h2>
          <TodoForm onAdd={handleAdd} />
          {errMsg ? (
            <div className="alert alert-error" role="alert" aria-live="assertive">
              {errMsg}
            </div>
          ) : null}
        </section>

        <section className="card">
          <h2 className="section-title">Your tasks</h2>
          {loading ? (
            <p role="status" aria-live="polite">Loading...</p>
          ) : (
            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <div className="container">
          <small>API URL: {process.env.REACT_APP_API_URL || 'http://localhost:3001'}</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
