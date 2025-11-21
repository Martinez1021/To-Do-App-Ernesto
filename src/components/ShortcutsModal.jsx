import { useEffect } from 'react';

export default function ShortcutsModal({ onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const shortcuts = [
    { keys: 'Ctrl + K', description: 'Abrir formulario nueva tarea' },
    { keys: 'Ctrl + R', description: 'Recargar tareas desde servidor' },
    { keys: 'Ctrl + /', description: 'Mostrar/ocultar atajos' },
    { keys: 'Esc', description: 'Cerrar modal activo' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⌨️ Atajos de teclado</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="shortcuts-list">
          {shortcuts.map(({ keys, description }) => (
            <div key={keys} className="shortcut-item">
              <kbd className="shortcut-keys">{keys}</kbd>
              <span className="shortcut-desc">{description}</span>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <p className="helper-text">
            💡 Usa estos atajos para navegar más rápidamente por la aplicación.
          </p>
        </div>
      </div>
    </div>
  );
}
