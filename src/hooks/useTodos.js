import { useState, useEffect, useCallback } from 'react';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../services/todosApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'alpha', 'status'

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
      setLastSync(new Date().toISOString());
    } catch (err) {
      setError(err.message ?? 'Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const create = useCallback(async (text, category = null, dueDate = null, priority = 'medium') => {
    const next = text.trim();
    if (!next) return null;

    setError(null);
    try {
      const newTodo = await addTodo(next, category, dueDate, priority);
      setTodos((prev) => [newTodo, ...prev]);
      setLastSync(new Date().toISOString());
      return newTodo;
    } catch (err) {
      setError(err.message ?? 'Error al crear la tarea');
      return null;
    }
  }, []);

  const toggle = useCallback(async (id, done) => {
    setError(null);
    try {
      const updated = await updateTodo(id, { done });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo)),
      );
      setLastSync(new Date().toISOString());
      return updated;
    } catch (err) {
      setError(err.message ?? 'Error al actualizar la tarea');
      return null;
    }
  }, []);

  const remove = useCallback(async (id) => {
    setError(null);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setLastSync(new Date().toISOString());
      return id;
    } catch (err) {
      setError(err.message ?? 'Error al eliminar la tarea');
      return null;
    }
  }, []);

  const updateCategory = useCallback(async (id, category) => {
    setError(null);
    try {
      const updated = await updateTodo(id, { category });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo)),
      );
      setLastSync(new Date().toISOString());
      return updated;
    } catch (err) {
      setError(err.message ?? 'Error al actualizar categoría');
      return null;
    }
  }, []);

  const updatePriority = useCallback(async (id, priority) => {
    setError(null);
    try {
      const updated = await updateTodo(id, { priority });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo)),
      );
      setLastSync(new Date().toISOString());
      return updated;
    } catch (err) {
      setError(err.message ?? 'Error al actualizar prioridad');
      return null;
    }
  }, []);

  const importTodos = useCallback(async (todosData) => {
    setError(null);
    try {
      const imported = await Promise.all(
        todosData.map((todo) => addTodo(todo.text, todo.category, todo.due_date))
      );
      setTodos((prev) => [...imported, ...prev]);
      setLastSync(new Date().toISOString());
      return imported;
    } catch (err) {
      setError(err.message ?? 'Error al importar tareas');
      return null;
    }
  }, []);

  const getSortedTodos = useCallback(() => {
    const sorted = [...todos];
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    
    switch (sortBy) {
      case 'alpha':
        return sorted.sort((a, b) => a.text.localeCompare(b.text));
      case 'status':
        return sorted.sort((a, b) => a.done - b.done);
      case 'priority':
        return sorted.sort((a, b) => 
          priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']
        );
      case 'date':
      default:
        return sorted.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at),
        );
    }
  }, [todos, sortBy]);

  return { 
    todos: getSortedTodos(), 
    loading, 
    error, 
    create, 
    toggle, 
    remove, 
    reload, 
    lastSync,
    sortBy,
    setSortBy,
    updateCategory,
    updatePriority,
    importTodos,
  };
}
