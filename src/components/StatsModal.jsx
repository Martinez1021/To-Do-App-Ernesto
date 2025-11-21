import { useEffect, useMemo } from 'react';

export default function StatsModal({ todos, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.done).length;
    const pending = total - done;
    const completionRate = total ? ((done / total) * 100).toFixed(1) : 0;

    const today = new Date().toDateString();
    const createdToday = todos.filter(
      (t) => new Date(t.created_at).toDateString() === today
    ).length;

    const avgLength = total
      ? (todos.reduce((sum, t) => sum + t.text.length, 0) / total).toFixed(0)
      : 0;

    const oldest = todos.length
      ? new Date(
          Math.min(...todos.map((t) => new Date(t.created_at)))
        ).toLocaleDateString('es-ES')
      : 'N/A';

    const newest = todos.length
      ? new Date(
          Math.max(...todos.map((t) => new Date(t.created_at)))
        ).toLocaleDateString('es-ES')
      : 'N/A';

    return {
      total,
      done,
      pending,
      completionRate,
      createdToday,
      avgLength,
      oldest,
      newest,
    };
  }, [todos]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content stats-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📊 Estadísticas</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total de tareas</span>
            <strong className="stat-value">{stats.total}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completadas</span>
            <strong className="stat-value done">{stats.done}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pendientes</span>
            <strong className="stat-value pending">{stats.pending}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Tasa de completitud</span>
            <strong className="stat-value">{stats.completionRate}%</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Creadas hoy</span>
            <strong className="stat-value">{stats.createdToday}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Longitud promedio</span>
            <strong className="stat-value">{stats.avgLength} chars</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Tarea más antigua</span>
            <strong className="stat-value small">{stats.oldest}</strong>
          </div>
          <div className="stat-item">
            <span className="stat-label">Tarea más reciente</span>
            <strong className="stat-value small">{stats.newest}</strong>
          </div>
        </div>

        <div className="visual-chart">
          <h3>Distribución</h3>
          <div className="chart-bars">
            <div className="chart-bar">
              <div
                className="chart-bar__fill done"
                style={{ width: `${(stats.done / stats.total) * 100}%` }}
              />
              <span>{stats.done} completadas</span>
            </div>
            <div className="chart-bar">
              <div
                className="chart-bar__fill pending"
                style={{ width: `${(stats.pending / stats.total) * 100}%` }}
              />
              <span>{stats.pending} pendientes</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
