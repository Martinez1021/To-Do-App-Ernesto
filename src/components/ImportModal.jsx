import { useEffect, useState } from 'react';

export default function ImportModal({ onImport, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) {
          setError('El archivo debe contener un array de tareas.');
          return;
        }
        setPreview(json.slice(0, 5));
      } catch (err) {
        setError('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleImport = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        onImport(json);
      } catch (err) {
        setError('Error al importar tareas.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📥 Importar tareas</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="import-content">
          <div className="field-group">
            <label htmlFor="file-input">Selecciona un archivo JSON</label>
            <input
              id="file-input"
              type="file"
              accept=".json"
              onChange={handleFileChange}
            />
            <p className="helper-text">
              El archivo debe contener un array de objetos con la propiedad "text".
            </p>
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {preview.length > 0 && (
            <div className="preview-section">
              <h3>Vista previa (primeras 5 tareas)</h3>
              <ul className="preview-list">
                {preview.map((todo, idx) => (
                  <li key={idx}>{todo.text || 'Sin texto'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="primary"
            onClick={handleImport}
            disabled={!file || error}
          >
            Importar tareas
          </button>
        </div>
      </div>
    </div>
  );
}
