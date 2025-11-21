import { useState } from 'react';

export default function AddTodo({ onAdd, disabled }) {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || submitting || disabled) return;

    setSubmitting(true);
    try {
      await onAdd(text);
      setValue('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled || submitting}
          aria-label="Descripción de la tarea"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || submitting || !value.trim()}
          title="Guardar nueva tarea"
        >
          Añadir
        </button>
      </div>
      <p className="helper-text">
        Describe lo que necesitas hacer y pulsa “Añadir”.
      </p>
    </form>
  );
}
