import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Displays a list of todos using TodoItem.
 * Props:
 * - todos: Array<{ id, title, description?, completed }>
 * - onToggle(id, completed)
 * - onSave(id, data)
 * - onDelete(id)
 */
function TodoList({ todos, onToggle, onSave, onDelete }) {
  if (!todos || todos.length === 0) {
    return <p className="empty-state" role="status" aria-live="polite">No tasks yet. Add your first task above.</p>;
  }

  return (
    <ul className="todo-list" aria-label="Todo items">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
