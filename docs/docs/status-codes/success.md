# Códigos de Estado HTTP - Éxito

Esta sección explica los códigos de estado HTTP que indican operaciones exitosas en la API.

## ✅ 200 - OK

**Descripción**: La operación se completó exitosamente.

**Cuándo se usa**:

- GET exitoso
- PUT exitoso (actualización)
- DELETE exitoso

**Ejemplo de respuesta**:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

## ✅ 201 - Created

**Descripción**: Un nuevo recurso fue creado exitosamente.

**Cuándo se usa**:

- POST exitoso (crear usuario)
- POST exitoso (crear múltiples usuarios)

**Ejemplo de respuesta**:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

## 📊 Estructura de respuestas exitosas

Todas las respuestas exitosas siguen esta estructura:

```json
{
  "success": true,
  "message": "Descripción del resultado",
  "data": {
    // Datos específicos del endpoint
  }
}
```

### Campos comunes

| Campo     | Tipo           | Descripción                           |
| --------- | -------------- | ------------------------------------- |
| `success` | `boolean`      | Siempre `true` en respuestas exitosas |
| `message` | `string`       | Mensaje descriptivo del resultado     |
| `data`    | `object/array` | Datos específicos del endpoint        |

## 🔍 Ejemplos por endpoint

### GET /users (200)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    }
  ],
  "count": 1
}
```

### GET /users/:id (200)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### POST /users (201)

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### POST /users/multiple (201)

```json
{
  "success": true,
  "message": "3 users created successfully",
  "data": [
    {
      "id": 4,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "id": 5,
      "name": "María García",
      "email": "maria@example.com"
    }
  ]
}
```

### PUT /users/:id (200)

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Juan Carlos Pérez",
    "email": "juan.carlos@example.com"
  }
}
```

### DELETE /users/:id (200)

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "deletedRows": 1
  }
}
```

## 💡 Mejores prácticas

### Manejo en el cliente

```javascript
// Siempre verificar el campo 'success'
if (response.success) {
  // Procesar datos exitosamente
  console.log("Operación exitosa:", response.data);
} else {
  // Manejar error
  console.error("Error:", response.error);
}
```

### Verificación de códigos HTTP

```javascript
// Verificar código de estado HTTP
if (response.status === 200 || response.status === 201) {
  // Operación exitosa
  const data = await response.json();
  if (data.success) {
    // Procesar datos
  }
}
```

### Manejo de datos específicos

```javascript
// Para endpoints que retornan arrays
if (response.success && Array.isArray(response.data)) {
  response.data.forEach((item) => {
    console.log(`ID: ${item.id}, Nombre: ${item.name}`);
  });
}

// Para endpoints que retornan objetos únicos
if (response.success && response.data.id) {
  console.log(`Usuario: ${response.data.name}`);
}
```
