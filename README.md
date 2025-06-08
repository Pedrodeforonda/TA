# Academic Coordinator Platform

Esta plataforma permite a los coordinadores académicos gestionar instituciones, materias, invitaciones, y monitorear métricas de asistencia y rendimiento de los estudiantes.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18.x o superior)
- [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/) (recomendado)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clonar el repositorio** (si aún no lo has hecho):
   ```bash
   git clone <url-del-repositorio>
   cd academic-coordinator-platform
   ```

2. **Instalar dependencias**:
   
   Con npm:
   ```bash
   npm install --legacy-peer-deps
   ```
   
   O con pnpm (recomendado para mejor rendimiento):
   ```bash
   pnpm install --shamefully-hoist
   ```

   > Nota: Utilizamos `--legacy-peer-deps` con npm debido a conflictos de dependencias entre react-day-picker y date-fns.

## Ejecución del Proyecto

### Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

O con pnpm:

```bash
pnpm dev
```

La aplicación estará disponible en:
- Local: [http://localhost:3000](http://localhost:3000)
- Red: http://[tu-ip-local]:3000

### Producción

Para generar una versión de producción:

```bash
npm run build
npm start
```

O con pnpm:

```bash
pnpm build
pnpm start
```

## Estructura del Proyecto

```
academic-coordinator-platform/
├── app/               # Directorio principal de la aplicación Next.js
│   ├── globals.css    # Estilos globales
│   ├── layout.tsx     # Layout principal
│   └── page.tsx       # Página principal
├── components/        # Componentes reutilizables
│   ├── auth/          # Componentes de autenticación
│   ├── institution/   # Gestión de instituciones
│   ├── invitations/   # Gestión de invitaciones
│   ├── metrics/       # Visualización de métricas
│   ├── subjects/      # Gestión de materias
│   └── ui/            # Componentes de interfaz de usuario
├── hooks/             # Hooks personalizados
├── lib/              # Utilidades y funciones auxiliares
├── public/           # Archivos estáticos
└── styles/           # Estilos adicionales
```

## Solución de Problemas

### Error: 'next' not found

Si encuentras el error `sh: 1: next: not found`, asegúrate de haber instalado correctamente las dependencias:

```bash
npm install --legacy-peer-deps
```

### Conflictos de Dependencias

Si encuentras errores relacionados con conflictos de dependencias, intenta:

```bash
npm install --force
```

o 

```bash
npm install --legacy-peer-deps
```

## Características Principales

- Dashboard para coordinadores académicos
- Gestión de instituciones educativas
- Seguimiento de asistencia de estudiantes
- Identificación de estudiantes en riesgo académico
- Administración de materias y cursos
- Sistema de invitaciones para nuevos usuarios

## Tecnologías

- [Next.js 15](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
