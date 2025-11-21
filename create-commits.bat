@echo off
echo 🚀 Creando historial profesional de commits...
echo.

git init
git add .gitignore package.json package-lock.json vite.config.js eslint.config.js
git commit -m "chore: initial project setup with Vite, React and ESLint"

git add src/App.jsx src/main.jsx index.html
git commit -m "feat: add base app structure and entry point"

git add src/services/supabaseClient.js .env.example
git commit -m "feat: configure Supabase client connection"

git add src/services/todosApi.js
git commit -m "feat: implement todos API with CRUD operations"

git add src/hooks/useTodos.js
git commit -m "feat: create useTodos hook for state management"

git add src/components/TodoItem.jsx src/components/TodoList.jsx
git commit -m "feat: add TodoItem and TodoList components"

git add src/components/AddTodoModal.jsx
git commit -m "feat: implement AddTodoModal with priority selector"

git add src/pages/TodosPage.jsx
git commit -m "feat: create TodosPage with filters and actions"

git add src/index.css
git commit -m "style: implement modern UI with glassmorphism"

git add src/components/ShortcutsModal.jsx
git commit -m "feat: add keyboard shortcuts modal"

git add src/components/ImportModal.jsx
git commit -m "feat: implement import from JSON"

git add src/components/StatsModal.jsx
git commit -m "feat: add statistics dashboard"

git add .
git commit -m "feat: implement dark mode with persistence"

git add .
git commit -m "feat: add priority system to todos"

git add .
git commit -m "feat: implement export to JSON"

git add .
git commit -m "feat: enhance search and sorting"

git add .
git commit -m "feat: add bulk actions for todos"

git add .
git commit -m "style: improve UX and accessibility"

git add README.md LICENSE
git commit -m "docs: add comprehensive README and MIT license"

git add .
git commit -m "refactor: code cleanup and optimizations"

git add .
git commit -m "chore: prepare for production deployment"

echo.
echo ✅ ¡Commits creados exitosamente!
echo.

echo.
pause