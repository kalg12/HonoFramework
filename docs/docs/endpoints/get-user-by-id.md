# GET /users/:id

Obtiene un usuario específico por su ID.

## 📋 Descripción

Este endpoint permite recuperar la información completa de un usuario específico utilizando su ID único.

## 🔗 Endpoint

```http
GET /users/:id
```

### Parámetros de URL

| Parámetro | Tipo     | Requerido | Descripción          |
| --------- | -------- | --------- | -------------------- |
| `id`      | `number` | ✅        | ID único del usuario |

## 📤 Respuesta

### ✅ Éxito (200)

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

### ❌ Usuario no encontrado (404)

```json
{
  "success": false,
  "error": "User not found",
  "message": "No user found with ID: 999"
}
```

### 📊 Campos de respuesta

| Campo     | Tipo      | Descripción                        |
| --------- | --------- | ---------------------------------- |
| `success` | `boolean` | Indica si la operación fue exitosa |
| `data`    | `object`  | Datos del usuario (solo en éxito)  |
| `error`   | `string`  | Tipo de error (solo en error)      |
| `message` | `string`  | Mensaje descriptivo del error      |

## 💻 Ejemplos de uso

### cURL

```bash
# Usuario existente
curl -X GET http://localhost:3000/users/1 \
  -H "Content-Type: application/json"

# Usuario no existente
curl -X GET http://localhost:3000/users/999 \
  -H "Content-Type: application/json"
```

### JavaScript (Fetch API)

```javascript
async function getUserById(id) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const data = await response.json();

    if (data.success) {
      console.log("Usuario encontrado:", data.data);
      return data.data;
    } else {
      console.error("Error:", data.error, data.message);
      return null;
    }
  } catch (error) {
    console.error("Error de red:", error);
    return null;
  }
}

// Uso
const user = await getUserById(1);
if (user) {
  console.log(`Usuario: ${user.name} - ${user.email}`);
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

async function getUserById(id) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    const { success, data } = response.data;

    if (success) {
      console.log("Usuario encontrado:", data);
      return data;
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.log("Usuario no encontrado");
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Uso
const user = await getUserById(1);
```

### Python (requests)

```python
import requests

def get_user_by_id(user_id):
    try:
        response = requests.get(f'http://localhost:3000/users/{user_id}')
        data = response.json()

        if data['success']:
            print(f"Usuario encontrado: {data['data']['name']}")
            return data['data']
        else:
            print(f"Error: {data['message']}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return None

# Uso
user = get_user_by_id(1)
if user:
    print(f"Email: {user['email']}")
```

### PHP

```php
<?php
function getUserById($id) {
    $url = "http://localhost:3000/users/{$id}";
    $response = file_get_contents($url);
    $data = json_decode($response, true);

    if ($data['success']) {
        echo "Usuario encontrado: {$data['data']['name']}\n";
        return $data['data'];
    } else {
        echo "Error: {$data['message']}\n";
        return null;
    }
}

// Uso
$user = getUserById(1);
if ($user) {
    echo "Email: {$user['email']}\n";
}
?>
```

## 🔍 Casos de uso

- **Perfil de usuario**: Mostrar información detallada de un usuario
- **Validación**: Verificar si un usuario existe antes de operaciones
- **Formularios de edición**: Cargar datos para modificar
- **Enlaces directos**: Acceso directo a usuarios específicos

## ⚠️ Consideraciones

- **ID válido**: El ID debe ser un número entero positivo
- **Usuario existente**: Verificar que el usuario existe antes de mostrar datos
- **Manejo de errores**: Siempre verificar el campo `success` en la respuesta
- **Caché**: Considerar caché para usuarios frecuentemente consultados
