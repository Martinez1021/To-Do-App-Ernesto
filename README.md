# ✨ To-Do App Ernesto

Aplicación moderna de gestión de tareas construida con **React**, **Vite** y **Supabase**. Incluye funcionalidades avanzadas como prioridades, filtros, búsqueda, modo oscuro, estadísticas y más.

![To-Do App](https://img.shields.io/badge/React-19.2-blue) ![Supabase](https://img.shields.io/badge/Supabase-Connected-green) ![Vite](https://img.shields.io/badge/Vite-7.2-purple)

## 🚀 Características

- ✅ **CRUD completo** de tareas con base de datos en tiempo real
- 🎯 **Sistema de prioridades** (Alta, Media, Baja) con indicadores visuales
- 🔍 **Búsqueda y filtrado** avanzado de tareas
- 📊 **Dashboard de estadísticas** con métricas detalladas
- 🌙 **Modo oscuro** persistente
- ⌨️ **Atajos de teclado** para mayor productividad
- 💾 **Importar/Exportar** tareas en formato JSON
- 📱 **Diseño responsive** con glassmorphism
- ⚡ **Sincronización en tiempo real** con Supabase

## 📸 Capturas de Pantalla

<img width="1879" height="960" alt="image" src="https://github.com/user-attachments/assets/05e36348-477d-4c7c-8285-5b4f038589b9" />


## 🛠️ Tecnologías

- **Frontend**: React 19, Vite 7
- **Backend/Base de datos**: Supabase
- **Estilos**: CSS3 con variables CSS y animaciones
- **Estado**: React Hooks (useState, useEffect, useCallback, useMemo)

## 📋 Requisitos Previos

- Node.js ≥ 18
- npm o yarn
- Cuenta gratuita en [Supabase](https://supabase.com)

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/supabase-todos.git
   cd supabase-todos
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita `.env` y añade tus credenciales de Supabase:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```

4. **Configura la base de datos en Supabase**
   
   Ve al SQL Editor de tu proyecto en Supabase y ejecuta:
   
   ```sql
   create extension if not exists pgcrypto;

   create table if not exists public.todos (
     id uuid primary key default gen_random_uuid(),
     text text not null,
     done boolean not null default false,
     priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
     category text,
     due_date timestamptz,
     created_at timestamptz not null default now()
   );

   alter table public.todos enable row level security;

   drop policy if exists "todos_read_all" on public.todos;
   drop policy if exists "todos_insert_all" on public.todos;
   drop policy if exists "todos_update_all" on public.todos;
   drop policy if exists "todos_delete_all" on public.todos;

   create policy "todos_read_all" on public.todos for select using (true);
   create policy "todos_insert_all" on public.todos for insert with check (true);
   create policy "todos_update_all" on public.todos for update using (true);
   create policy "todos_delete_all" on public.todos for delete using (true);
   ```

5. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Ejecuta ESLint |

## ⌨️ Atajos de Teclado

- `Ctrl + K` → Abrir formulario para nueva tarea
- `Ctrl + R` → Recargar tareas desde servidor
- `Ctrl + /` → Mostrar/ocultar atajos
- `Esc` → Cerrar modal activo

## 🏗️ Estructura del Proyecto

```
supabase-todos/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── AddTodoModal.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   ├── ImportModal.jsx
│   │   ├── StatsModal.jsx
│   │   └── ShortcutsModal.jsx
│   ├── hooks/           # Custom hooks
│   │   └── useTodos.js
│   ├── pages/           # Páginas principales
│   │   └── TodosPage.jsx
│   ├── services/        # API y servicios
│   │   ├── supabaseClient.js
│   │   └── todosApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css        # Estilos globales
├── .env.example         # Variables de entorno ejemplo
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Características de Diseño

- **Glassmorphism**: Efectos de vidrio esmerilado con blur
- **Gradientes**: Colores vibrantes y modernos
- **Animaciones**: Transiciones suaves y micro-interacciones
- **Responsive**: Adaptado para móviles, tablets y escritorio
- **Dark Mode**: Tema oscuro con persistencia en localStorage

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea tu rama de característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Ernesto** - [GitHub](https://github.com/TU_USUARIO)

## 🙏 Agradecimientos

- [Supabase](https://supabase.com) por el backend as a service
- [Vite](https://vitejs.dev) por el bundler ultrarrápido
- [React](https://react.dev) por la librería UI

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
