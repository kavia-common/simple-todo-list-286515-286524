const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const TODOS_URL = `${BASE_URL}/todos`;

// PUBLIC_INTERFACE
export async function getTodos() {
  /** Fetch all todos from the backend. Returns an array of todos. */
  const res = await fetch(TODOS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.status}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function createTodo({ title, description }) {
  /** Create a new todo with title and optional description. Returns created todo. */
  const res = await fetch(TODOS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) {
    const msg = await safeText(res);
    throw new Error(`Failed to create todo: ${res.status} ${msg}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateTodo(id, data) {
  /** Update a todo by id with provided data (e.g., {title, description, completed}). Returns updated todo. */
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await safeText(res);
    throw new Error(`Failed to update todo: ${res.status} ${msg}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function toggleTodo(id, completed) {
  /** Toggle completion state for a todo via PATCH. Returns updated todo. */
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) {
    const msg = await safeText(res);
    throw new Error(`Failed to toggle todo: ${res.status} ${msg}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteTodo(id) {
  /** Delete a todo by id. Returns nothing on success. */
  const res = await fetch(`${TODOS_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const msg = await safeText(res);
    throw new Error(`Failed to delete todo: ${res.status} ${msg}`);
  }
  return true;
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
