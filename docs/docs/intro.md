# Introducción

Bienvenido a la documentación de la **API de Usuarios** construida con Hono y SQLite. Esta API proporciona un sistema completo de gestión de usuarios con operaciones CRUD robustas y respuestas consistentes.

## 🚀 ¿Qué es esta API?

Esta API está diseñada para gestionar usuarios de manera eficiente y segura, proporcionando:

- ✅ **CRUD completo** de usuarios (Crear, Leer, Actualizar, Eliminar)
- ✅ **Validaciones robustas** de datos de entrada
- ✅ **Manejo de errores** detallado y amigable
- ✅ **Respuestas consistentes** con estructura estándar
- ✅ **Códigos de estado HTTP** apropiados
- ✅ **Base de datos SQLite** para persistencia local

## 🛠 Tecnologías utilizadas

- **Framework**: [Hono](https://hono.dev/) - Ultra-rápido y ligero
- **Base de datos**: SQLite con [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Lenguaje**: TypeScript
- **Validación**: Campos requeridos y emails únicos
- **Documentación**: Docusaurus

## 📋 Características principales

### Estructura de respuestas consistente

Todas las respuestas siguen un formato estándar:

```json
{
  "success": true,
  "message": "Descripción del resultado",
  "data": {
    /* datos específicos */
  }
}
```

### Validaciones implementadas

- **Campos requeridos**: `name` y `email` son obligatorios
- **Email único**: No se permiten emails duplicados
- **Validación de tipos**: Verificación de tipos de datos

### Códigos de estado HTTP

- `200` - Operación exitosa
- `201` - Recurso creado exitosamente
- `400` - Error de validación
- `404` - Recurso no encontrado
- `409` - Conflicto (email duplicado)
- `500` - Error interno del servidor

## 🎯 Endpoints disponibles

| Método   | Endpoint          | Descripción                |
| -------- | ----------------- | -------------------------- |
| `GET`    | `/users`          | Obtener todos los usuarios |
| `GET`    | `/users/:id`      | Obtener usuario por ID     |
| `POST`   | `/users`          | Crear nuevo usuario        |
| `POST`   | `/users/multiple` | Crear múltiples usuarios   |
| `PUT`    | `/users/:id`      | Actualizar usuario         |
| `DELETE` | `/users/:id`      | Eliminar usuario           |

## 🚀 Empezar

Para comenzar a usar la API:

1. **Asegúrate de que el servidor esté ejecutándose** en `http://localhost:3000`
2. **Revisa los ejemplos** en cada endpoint
3. **Usa los códigos de ejemplo** proporcionados
4. **Consulta la sección de códigos de estado** para manejar errores

## 📖 Navegación

- **[Endpoints](/docs/endpoints/get-users)**: Documentación detallada de cada endpoint
- **[Códigos de Estado](/docs/status-codes/success)**: Explicación de respuestas HTTP
- **[Ejemplos](/docs/examples)**: Casos de uso comunes

¡Explora la documentación y comienza a integrar la API en tu proyecto!
