# 🤖 AI Assistants Manager
Aplicación web desarrollada con Next.js (App Router) que permite crear, listar, editar y eliminar asistentes de IA, con una arquitectura enfocada en gestión de estado profesional, experiencia de usuario y código mantenible.

[!IMPORTANT] Nota sobre persistencia: El proyecto no utiliza persistencia real. Los datos viven en memoria durante la sesión y se reinician al recargar la página. El objetivo es evaluar arquitectura, estado y UX, no backend.

## 🧱 Stack Tecnológico
Framework: Next.js (App Router)

Lenguaje: TypeScript

Estilos: Tailwind CSS

Estado global: Zustand

Operaciones async: TanStack React Query

Formularios: React Hook Form

Gestor de paquetes: pnpm (usando Corepack)

Linting: ESLint


## 🚀 Guía paso a paso para correr el proyecto localmente

### 1. Clonar el repositorio
``` git clone https://github.com/juanjts/ai-assistants-manager.git ```

``` cd ai-assistants-manager ```

### 2. Configurar Node.js y pnpm
Se requiere Node.js 18 o superior (Versión recomendada: 24.13.0 LTS).

### Habilitar Corepack y activar pnpm

``` corepack enable corepack prepare pnpm@latest --activate ```

### Verificar instalaciones

``` node -v pnpm -v ```


### 3. Instalar dependencias y ejecutar

**Instalar dependencias**

``` pnpm install ```

**Ejecutar el proyecto**

``` pnpm dev ```

### 4. Abrir en el navegador
Accede a: http://localhost:3000

**[!TIP] Solución a errores de permisos: Si pnpm no es reconocido en Windows (PowerShell), ejecuta el siguiente comando:**

``` Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned ```

**Luego, intenta nuevamente con pnpm install.**

### 📂 Estructura base del proyecto
src/  ├── app/ # App Router (Next.js)
      ├── components/ # Componentes reutilizables 
      ├── store/ # Zustand (estado global) 
      ├── services/ # Servicios simulados (CRUD) 
      ├── hooks/ # Hooks personalizados 
      ├── types/ # Tipos TypeScript

### 🎯 Objetivo del Proyecto
Este proyecto fue desarrollado para demostrar:

Manejo de estado: Sincronización entre Zustand y React Query.
Arquitectura: Estructura escalable en Next.js App Router.
Buenas prácticas: Validaciones en formularios, gestión de tipos y UX intuitiva.
Clean Code: Separación clara de responsabilidades y código legible.

### 📌 Notas Finales
No se requiere base de datos ni un backend real.
El foco está 100% en la arquitectura del frontend y la experiencia de usuario.



Desarrollado por Juan JTS*
