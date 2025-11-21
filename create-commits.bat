@echo off
echo 🚀 Creando historial profesional de commits en español...
echo.

git init
git add .gitignore package.json package-lock.json vite.config.js eslint.config.js
git commit -m "inicial: configuración base del proyecto con Vite, React y ESLint"

git add src/App.jsx src/main.jsx index.html
git commit -m "feat: añadir estructura base de la aplicación y punto de entrada"

git add src/services/supabaseClient.js .env.example
git commit -m "feat: configurar cliente de Supabase y variables de entorno"

git add src/services/todosApi.js
git commit -m "feat: implementar capa API con operaciones CRUD para tareas"

git add src/hooks/useTodos.js
git commit -m "feat: crear hook personalizado useTodos para gestión de estado"

git add src/components/TodoItem.jsx src/components/TodoList.jsx
git commit -m "feat: añadir componentes TodoItem y TodoList"

git add src/components/AddTodoModal.jsx
git commit -m "feat: implementar modal para añadir tareas con selector de prioridad"

git add src/pages/TodosPage.jsx
git commit -m "feat: crear página principal con filtros y acciones masivas"

git add src/index.css
git commit -m "style: implementar diseño moderno con efecto glassmorphism"

git add src/components/ShortcutsModal.jsx
git commit -m "feat: añadir modal de atajos de teclado"

git add src/components/ImportModal.jsx
git commit -m "feat: implementar funcionalidad de importar tareas desde JSON"

git add src/components/StatsModal.jsx
git commit -m "feat: añadir dashboard de estadísticas con métricas"

git add .
git commit -m "feat: implementar modo oscuro con persistencia en localStorage"

git add .
git commit -m "feat: añadir sistema de prioridades para tareas (alta, media, baja)"

git add .
git commit -m "feat: implementar exportación de tareas a formato JSON"

git add .
git commit -m "feat: mejorar búsqueda y añadir múltiples opciones de ordenación"

git add .
git commit -m "feat: añadir acciones masivas (marcar todas, eliminar completadas)"

git add .
git commit -m "style: mejorar experiencia de usuario y accesibilidad"

git add README.md LICENSE
git commit -m "docs: añadir README completo con instrucciones y licencia MIT"

git add .
git commit -m "refactor: limpieza de código y optimización de rendimiento"

git add .
git commit -m "chore: preparar proyecto para despliegue en producción"

echo.
echo ✅ ¡Commits creados exitosamente!
echo.
pause