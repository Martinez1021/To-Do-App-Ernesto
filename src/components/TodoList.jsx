import TodoItem from './TodoItem';

export default function TodoList({
  items = [],
  onToggle,
  onDelete,
  emptyLabel = 'Aún no hay tareas.',
}) {
  if (!items.length) {
    return (
      <div className="empty-state" role="status">
        <h3>📭 {emptyLabel}</h3>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
