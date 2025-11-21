// TODO: Componente que muestra un todo individual
// Recibe: { todo, onToggle, onDelete }

export default function TodoItem({ todo, onToggle, onDelete }) {
  const createdLabel = todo.created_at
    ? new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(todo.created_at))
    : 'Sin fecha';

  const priorityLabels = {
    high: '🔴 Alta',
    medium: '🟡 Media',
    low: '🟢 Baja',
  };

  const priority = todo.priority || 'medium';

  return (
    <li className={`todo-item ${todo.done ? 'completed' : ''} priority-${priority}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id, !todo.done)}
        aria-label={`Marcar "${todo.text}" como ${todo.done ? 'pendiente' : 'hecha'}`}
      />
      <div className="todo-content">
        <div className="todo-text-row">
          <span className="todo-text">{todo.text}</span>
          <div className="badges">
            <span className={`badge badge-priority priority-${priority}`}>
              {priorityLabels[priority]}
            </span>
            <span className={`badge ${todo.done ? 'badge--done' : 'badge--pending'}`}>
              {todo.done ? '✓ Hecha' : '○ Pendiente'}
            </span>
          </div>
        </div>
        <div className="todo-meta">
          <small>📅 {createdLabel}</small>
          <button
            type="button"
            className="secondary"
            onClick={() => onDelete(todo.id)}
            aria-label={`Eliminar "${todo.text}"`}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
