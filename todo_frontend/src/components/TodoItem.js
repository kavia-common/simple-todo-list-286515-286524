import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem
 * Renders a single todo with editing, toggling and deletion.
 * Props:
 * - todo: { id, title, description?, completed }
 * - onToggle(id: string|number, completed: boolean)
 * - onSave(id: string|number, data: { title, description })
 * - onDelete(id: string|number)
 */
function TodoItem({ todo, onToggle, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(todo.title || '');
  const [localDescription, setLocalDescription] = useState(todo.description || '');
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setLocalTitle(todo.title || '');
    setLocalDescription(todo.description || '');
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setLocalTitle(todo.title || '');
    setLocalDescription(todo.description || '');
  };

  const saveEdit = async () => {
    const payload = {
      title: localTitle.trim(),
      description: localDescription.trim() || undefined,
    };
    if (!payload.title) return;
    try {
      setSaving(true);
      await onSave(todo.id, payload);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} aria-label={`Todo ${todo.title}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
          aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        {!editing ? (
          <div className="content">
            <div className="title" role="heading" aria-level={3}>{todo.title}</div>
            {todo.description ? (
              <div className="description">{todo.description}</div>
            ) : null}
          </div>
        ) : (
          <div className="content edit">
            <label htmlFor={`edit-title-${todo.id}`} className="sr-only">Edit title</label>
            <input
              id={`edit-title-${todo.id}`}
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              aria-label="Edit title"
            />
            <label htmlFor={`edit-desc-${todo.id}`} className="sr-only">Edit description</label>
            <textarea
              id={`edit-desc-${todo.id}`}
              rows={2}
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              aria-label="Edit description"
            />
          </div>
        )}
      </div>
      <div className="right">
        {!editing ? (
          <>
            <button
              type="button"
              className="btn btn-surface"
              onClick={startEdit}
              aria-label={`Edit ${todo.title}`}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-success"
              onClick={saveEdit}
              disabled={saving || !localTitle.trim()}
              aria-disabled={saving || !localTitle.trim()}
              aria-label={`Save ${todo.title}`}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn btn-surface"
              onClick={cancelEdit}
              aria-label={`Cancel editing ${todo.title}`}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
