# 📚 Hono API Documentation

Documentación completa de la API de usuarios construida con Hono y SQLite.

## 🚀 Inicio rápido

### Instalación

```bash
cd docs
npm install
```

### Desarrollo

```bash
npm start
```

### Build para producción

```bash
npm run build
```

### Servir build local

```bash
npm run serve
```

## 📁 Estructura del proyecto

```
docs/
├── docs/                    # Documentación
│   ├── intro.md            # Introducción
│   ├── endpoints/          # Documentación de endpoints
│   │   ├── get-users.md
│   │   ├── get-user-by-id.md
│   │   ├── post-users.md
│   │   ├── post-users-multiple.md
│   │   ├── put-user.md
│   │   └── delete-user.md
│   └── status-codes/       # Códigos de estado HTTP
│       ├── success.md
│       └── errors.md
├── src/
│   ├── css/
│   │   └── custom.css      # Estilos personalizados
│   └── pages/
├── static/                 # Archivos estáticos
├── docusaurus.config.ts   # Configuración principal
├── sidebars.ts           # Configuración del sidebar
└── package.json
```

## 🎨 Personalización

### Colores principales

- **Primario**: `#ff6b35` (Naranja vibrante)
- **Éxito**: `#10b981` (Verde)
- **Error**: `#ef4444` (Rojo)
- **Advertencia**: `#f59e0b` (Amarillo)
- **Info**: `#3b82f6` (Azul)

### Estilos personalizados

- Endpoints con colores por método HTTP
- Tablas de parámetros estilizadas
- Ejemplos de respuesta con indicadores visuales
- Responsive design para móviles

## 📖 Contenido

### Endpoints documentados

- **GET /users** - Obtener todos los usuarios
- **GET /users/:id** - Obtener usuario por ID
- **POST /users** - Crear nuevo usuario
- **POST /users/multiple** - Crear múltiples usuarios
- **PUT /users/:id** - Actualizar usuario
- **DELETE /users/:id** - Eliminar usuario

### Códigos de estado

- **200** - OK
- **201** - Created
- **400** - Bad Request
- **404** - Not Found
- **409** - Conflict
- **500** - Internal Server Error

## 🔧 Configuración

### docusaurus.config.ts

- Título: "Hono API Documentation"
- Idioma por defecto: Español
- Sidebar personalizado: `apiSidebar`
- Colores personalizados
- Soporte para JSON, Bash, JavaScript, TypeScript

### sidebars.ts

- Navegación organizada por categorías
- Emojis para mejor UX
- Estructura jerárquica clara

## 🌐 Deploy

### Vercel

```bash
npx vercel
```

### Netlify

Arrastra la carpeta `build/` a Netlify

### GitHub Pages

Configura en Settings > Pages del repositorio

## 📝 Contribuir

1. Edita los archivos en `docs/docs/`
2. Ejecuta `npm start` para ver cambios
3. Haz commit de los cambios
4. Push al repositorio

## 🎯 Características

- ✅ **Responsive**: Se adapta a móviles y desktop
- ✅ **Dark mode**: Soporte completo para modo oscuro
- ✅ **SEO optimizado**: Meta tags y estructura semántica
- ✅ **Navegación intuitiva**: Sidebar organizado
- ✅ **Ejemplos de código**: En múltiples lenguajes
- ✅ **Búsqueda**: Funcionalidad de búsqueda integrada
- ✅ **Accesibilidad**: Cumple estándares de accesibilidad

## 📞 Soporte

Para preguntas o problemas con la documentación:

- Abre un issue en el repositorio
- Contacta al desarrollador principal
- Revisa la documentación de Docusaurus

---

Construido con ❤️ usando [Docusaurus](https://docusaurus.io/)
