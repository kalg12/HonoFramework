# Códigos de Estado HTTP - Errores

Esta sección explica los códigos de estado HTTP que indican errores en la API y cómo manejarlos.

## ❌ 400 - Bad Request

**Descripción**: La solicitud tiene datos inválidos o faltantes.

**Cuándo se usa**:

- Campos requeridos faltantes
- Datos en formato incorrecto
- Validación de entrada fallida

**Ejemplo de respuesta**:

```json
{
  "success": false,
  "error": "Validation error",
  "message": "Name and email are required"
}
```

## ❌ 404 - Not Found

**Descripción**: El recurso solicitado no existe.

**Cuándo se usa**:

- Usuario no encontrado por ID
- Endpoint no existe
- Recurso eliminado o inexistente

**Ejemplo de respuesta**:

```json
{
  "success": false,
  "error": "User not found",
  "message": "No user found with ID: 999"
}
```

## ❌ 409 - Conflict

**Descripción**: Conflicto con el estado actual del recurso.

**Cuándo se usa**:

- Email duplicado al crear usuario
- Email duplicado al actualizar usuario
- Violación de restricciones únicas

**Ejemplo de respuesta**:

```json
{
  "success": false,
  "error": "Email already exists",
  "message": "The email 'juan@example.com' is already registered"
}
```

## ❌ 500 - Internal Server Error

**Descripción**: Error interno del servidor.

**Cuándo se usa**:

- Errores de base de datos
- Errores de conexión
- Errores inesperados del servidor

**Ejemplo de respuesta**:

```json
{
  "success": false,
  "error": "Database error",
  "message": "Failed to create user"
}
```

## 📊 Estructura de respuestas de error

Todas las respuestas de error siguen esta estructura:

```json
{
  "success": false,
  "error": "Tipo de error",
  "message": "Descripción detallada del error"
}
```

### Campos de error

| Campo     | Tipo      | Descripción                            |
| --------- | --------- | -------------------------------------- |
| `success` | `boolean` | Siempre `false` en respuestas de error |
| `error`   | `string`  | Tipo/categoría del error               |
| `message` | `string`  | Descripción detallada del error        |

## 🔍 Ejemplos por tipo de error

### Error de validación (400)

```json
{
  "success": false,
  "error": "Validation error",
  "message": "Name and email are required"
}
```

### Usuario no encontrado (404)

```json
{
  "success": false,
  "error": "User not found",
  "message": "No user found with ID: 999"
}
```

### Email duplicado (409)

```json
{
  "success": false,
  "error": "Email already exists",
  "message": "The email 'juan@example.com' is already registered by another user"
}
```

### Error del servidor (500)

```json
{
  "success": false,
  "error": "Database error",
  "message": "Failed to create users"
}
```

## 💻 Manejo de errores en el cliente

### JavaScript (Fetch API)

```javascript
async function handleApiCall() {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Juan", email: "juan@example.com" }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Éxito:", data.data);
    } else {
      // Manejar error específico
      switch (response.status) {
        case 400:
          console.error("Error de validación:", data.message);
          break;
        case 404:
          console.error("No encontrado:", data.message);
          break;
        case 409:
          console.error("Conflicto:", data.message);
          break;
        case 500:
          console.error("Error del servidor:", data.message);
          break;
        default:
          console.error("Error desconocido:", data.message);
      }
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

async function handleApiCall() {
  try {
    const response = await axios.post("/api/users", {
      name: "Juan",
      email: "juan@example.com",
    });

    console.log("Éxito:", response.data.data);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Error de validación:", data.message);
          break;
        case 404:
          console.error("No encontrado:", data.message);
          break;
        case 409:
          console.error("Conflicto:", data.message);
          break;
        case 500:
          console.error("Error del servidor:", data.message);
          break;
      }
    } else {
      console.error("Error de red:", error.message);
    }
  }
}
```

### Python (requests)

```python
import requests

def handle_api_call():
    try:
        response = requests.post('/api/users', json={
            'name': 'Juan',
            'email': 'juan@example.com'
        })

        data = response.json()

        if data['success']:
            print('Éxito:', data['data'])
        else:
            if response.status_code == 400:
                print('Error de validación:', data['message'])
            elif response.status_code == 404:
                print('No encontrado:', data['message'])
            elif response.status_code == 409:
                print('Conflicto:', data['message'])
            elif response.status_code == 500:
                print('Error del servidor:', data['message'])
            else:
                print('Error desconocido:', data['message'])

    except requests.exceptions.RequestException as e:
        print('Error de conexión:', e)
```

## 🛠 Mejores prácticas

### 1. Siempre verificar el campo `success`

```javascript
if (response.success) {
  // Manejar éxito
} else {
  // Manejar error
}
```

### 2. Usar códigos de estado HTTP para lógica

```javascript
if (response.status === 404) {
  // Mostrar mensaje "No encontrado"
} else if (response.status === 409) {
  // Mostrar mensaje "Email ya existe"
}
```

### 3. Mostrar mensajes amigables al usuario

```javascript
const errorMessages = {
  400: "Por favor, verifica los datos ingresados",
  404: "El usuario no fue encontrado",
  409: "Este email ya está registrado",
  500: "Error del servidor, intenta más tarde",
};

const userMessage = errorMessages[response.status] || "Error desconocido";
```

### 4. Implementar retry para errores temporales

```javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status < 500) {
        return response; // No es error del servidor
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```
