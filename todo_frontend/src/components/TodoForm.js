import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoForm
 * A controlled form for adding a new Todo.
 * Props:
 * - onAdd(title: string, description?: string): void
 */
function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const canSubmit = title.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd(title.trim(), description.trim() || undefined);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add new todo form">
      <div className="form-row">
        <label htmlFor="todo-title" className="sr-only">Title</label>
        <input
          id="todo-title"
          name="title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-required="true"
          aria-label="Todo title"
        />
      </div>
      <div className="form-row">
        <label htmlFor="todo-description" className="sr-only">Description (optional)</label>
        <textarea
          id="todo-description"
          name="description"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Todo description"
          rows={2}
        />
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
