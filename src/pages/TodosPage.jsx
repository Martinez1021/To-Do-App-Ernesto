import { useMemo, useState, useEffect } from 'react';
import AddTodoModal from '../components/AddTodoModal';
import TodoList from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';
import ShortcutsModal from '../components/ShortcutsModal';
import ImportModal from '../components/ImportModal';
import StatsModal from '../components/StatsModal';

export default function TodosPage() {
  const { 
    todos, 
    loading, 
    error, 
    create, 
    toggle, 
    remove, 
    reload, 
    lastSync,
    sortBy,
    setSortBy,
    importTodos,
  } = useTodos();
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const total = todos.length;
  const doneCount = todos.filter((todo) => todo.done).length;
  const pendingCount = total - doneCount;

  const filteredTodos = useMemo(() => {
    let result = todos;
    
    if (filter === 'done') result = result.filter((todo) => todo.done);
    if (filter === 'pending') result = result.filter((todo) => !todo.done);
    
    if (priorityFilter !== 'all') {
      result = result.filter((todo) => (todo.priority || 'medium') === priorityFilter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((todo) => 
        todo.text.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [todos, filter, priorityFilter, searchQuery]);

  const formattedSync = useMemo(() => {
    if (!lastSync) return 'Nunca';
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(lastSync));
  }, [lastSync]);

  const progress = total ? Math.round((doneCount / total) * 100) : 0;

  const handleAdd = async (text, category, dueDate, priority) => {
    await create(text, category, dueDate, priority);
    setShowModal(false);
  };

  const handleMarkAllDone = async () => {
    const pending = todos.filter((todo) => !todo.done);
    await Promise.all(pending.map((todo) => toggle(todo.id, true)));
  };

  const handleMarkAllPending = async () => {
    const done = todos.filter((todo) => todo.done);
    await Promise.all(done.map((todo) => toggle(todo.id, false)));
  };

  const handleDeleteCompleted = async () => {
    const completed = todos.filter((todo) => todo.done);
    if (completed.length === 0) return;
    
    const confirmed = window.confirm(
      `¿Eliminar ${completed.length} tareas completadas?`
    );
    if (!confirmed) return;
    
    await Promise.all(completed.map((todo) => remove(todo.id)));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (data) => {
    await importTodos(data);
    setShowImport(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', next);
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setShowModal(true);
        }
        if (e.key === 'r') {
          e.preventDefault();
          reload();
        }
        if (e.key === '/') {
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [reload]);

  return (
    <>
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <h1>✨ To-Do App Ernesto</h1>
          <p>Sincronizada con Supabase en tiempo real</p>
        </div>

        <div className="sidebar-stats">
          <div className="stat-card">
            <strong>{total}</strong>
            <span>Total</span>
          </div>
          <div className="stat-card">
            <strong>{pendingCount}</strong>
            <span>Pendientes</span>
          </div>
          <div className="stat-card">
            <strong>{doneCount}</strong>
            <span>Completadas</span>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-header">
            <strong>Progreso</strong>
            <span>{progress}%</span>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
          </div>
          <small>Última sincronización: {formattedSync}</small>
        </div>

        <div className="filters">
          <h3>Filtros</h3>
          {[
            {
              id: 'all',
              label: 'Todas',
              count: total,
            },
            {
              id: 'pending',
              label: 'Pendientes',
              count: pendingCount,
            },
            {
              id: 'done',
              label: 'Completadas',
              count: doneCount,
            },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              type="button"
              className={`chip ${filter === id ? 'chip--active' : ''}`}
              onClick={() => setFilter(id)}
            >
              <span>{label}</span>
              <strong>{count}</strong>
            </button>
          ))}
        </div>

        <div className="filters">
          <h3>Prioridad</h3>
          {[
            { id: 'all', label: 'Todas', icon: '⚪' },
            { id: 'high', label: 'Alta', icon: '🔴' },
            { id: 'medium', label: 'Media', icon: '🟡' },
            { id: 'low', label: 'Baja', icon: '🟢' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              className={`chip ${priorityFilter === id ? 'chip--active' : ''}`}
              onClick={() => setPriorityFilter(id)}
            >
              <span>{icon} {label}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-actions">
          <h3>Acciones</h3>
          <button
            type="button"
            className="action-btn"
            onClick={handleMarkAllDone}
            disabled={loading || pendingCount === 0}
          >
            ✓ Marcar todas completadas
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={handleMarkAllPending}
            disabled={loading || doneCount === 0}
          >
            ○ Marcar todas pendientes
          </button>
          <button
            type="button"
            className="action-btn danger"
            onClick={handleDeleteCompleted}
            disabled={loading || doneCount === 0}
          >
            🗑️ Eliminar completadas
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={handleExport}
            disabled={loading || total === 0}
          >
            💾 Exportar a JSON
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => setShowImport(true)}
            disabled={loading}
          >
            📥 Importar desde JSON
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => setShowStats(true)}
          >
            📊 Ver estadísticas
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={toggleDarkMode}
          >
            {darkMode ? '☀️' : '🌙'} Modo {darkMode ? 'claro' : 'oscuro'}
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => setShowShortcuts(true)}
          >
            ⌨️ Atajos de teclado
          </button>
        </div>
      </aside>

      <main className="app-main">
        <header className="main-header">
          <div className="header-left">
            <h2>
              {filter === 'all' && 'Todas las tareas'}
              {filter === 'pending' && 'Tareas pendientes'}
              {filter === 'done' && 'Tareas completadas'}
            </h2>
            {filteredTodos.length !== total && (
              <span className="filter-badge">
                {filteredTodos.length} de {total}
              </span>
            )}
          </div>
          <div className="header-actions">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Ordenar por"
            >
              <option value="date">📅 Por fecha</option>
              <option value="alpha">🔤 Alfabético</option>
              <option value="status">✓ Por estado</option>
              <option value="priority">🎯 Por prioridad</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Buscar tareas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className="secondary"
              onClick={reload}
              disabled={loading}
            >
              🔄 Recargar
            </button>
          </div>
        </header>

        <div className="main-content">
          {error && (
            <div className="error-banner" role="alert">
              <span>⚠️</span>
              <p>{error}</p>
              <button type="button" className="secondary" onClick={reload}>
                Reintentar
              </button>
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <h3>Cargando tareas...</h3>
            </div>
          ) : (
            <TodoList
              items={filteredTodos}
              onToggle={toggle}
              onDelete={remove}
              emptyLabel={
                filter === 'all'
                  ? 'Aún no hay tareas. ¡Crea la primera!'
                  : 'No hay tareas en este filtro.'
              }
            />
          )}
        </div>
      </main>

      <button
        type="button"
        className="fab"
        onClick={() => setShowModal(true)}
        title="Añadir nueva tarea (Ctrl+K)"
        aria-label="Añadir nueva tarea"
      >
        +
      </button>

      {showModal && (
        <AddTodoModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
          disabled={loading}
        />
      )}

      {showShortcuts && (
        <ShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}

      {showImport && (
        <ImportModal 
          onImport={handleImport}
          onClose={() => setShowImport(false)}
        />
      )}

      {showStats && (
        <StatsModal 
          todos={todos}
          onClose={() => setShowStats(false)}
        />
      )}
    </>
  );
}
