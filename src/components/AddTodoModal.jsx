import { useState, useEffect } from 'react';

export default function AddTodoModal({ onAdd, onClose, disabled }) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || submitting || disabled) return;

    setSubmitting(true);
    try {
      await onAdd(text, null, null, priority);
      setValue('');
      setPriority('medium');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Nueva tarea</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="task-input">¿Qué necesitas hacer?</label>
            <textarea
              id="task-input"
              placeholder="Escribe aquí tu tarea..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled || submitting}
              autoFocus
            />
            <p className="helper-text">
              Describe tu tarea con claridad para recordar qué hacer.
            </p>
          </div>

          <div className="field-group">
            <label htmlFor="priority-select">Prioridad</label>
            <select
              id="priority-select"
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={disabled || submitting}
            >
              <option value="high">🔴 Alta - Urgente</option>
              <option value="medium">🟡 Media - Normal</option>
              <option value="low">🟢 Baja - Cuando puedas</option>
            </select>
            <p className="helper-text">
              Define la importancia de esta tarea para priorizarla mejor.
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="primary"
              disabled={disabled || submitting || !value.trim()}
            >
              {submitting ? 'Guardando...' : 'Añadir tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
