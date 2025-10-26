# PUT /users/:id

Actualiza la información de un usuario existente.

## 📋 Descripción

Este endpoint permite modificar los datos de un usuario existente. Se pueden actualizar tanto el nombre como el email, pero el email debe seguir siendo único en el sistema.

## 🔗 Endpoint

```http
PUT /users/:id
Content-Type: application/json
```

### Parámetros de URL

| Parámetro | Tipo     | Requerido | Descripción                       |
| --------- | -------- | --------- | --------------------------------- |
| `id`      | `number` | ✅        | ID único del usuario a actualizar |

## 📥 Parámetros de entrada

| Campo   | Tipo     | Requerido | Descripción                       |
| ------- | -------- | --------- | --------------------------------- |
| `name`  | `string` | ✅        | Nuevo nombre completo del usuario |
| `email` | `string` | ✅        | Nuevo email del usuario           |

### Ejemplo de body

```json
{
  "name": "Juan Carlos Pérez",
  "email": "juan.carlos@example.com"
}
```

## 📤 Respuesta

### ✅ Usuario actualizado exitosamente (200)

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

### ❌ Error de validación (400)

```json
{
  "success": false,
  "error": "Validation error",
  "message": "Name and email are required"
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

### ❌ Email duplicado (409)

```json
{
  "success": false,
  "error": "Email already exists",
  "message": "The email 'juan.carlos@example.com' is already registered by another user"
}
```

### ❌ Error del servidor (500)

```json
{
  "success": false,
  "error": "Database error",
  "message": "Failed to update user"
}
```

## 💻 Ejemplos de uso

### cURL

```bash
# Actualizar usuario exitosamente
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez",
    "email": "juan.carlos@example.com"
  }'

# Error de validación (campos faltantes)
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez"
  }'

# Usuario no encontrado
curl -X PUT http://localhost:3000/users/999 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Nuevo",
    "email": "nuevo@example.com"
  }'
```

### JavaScript (Fetch API)

```javascript
async function updateUser(id, name, email) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Usuario actualizado:", data.data);
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
const updatedUser = await updateUser(
  1,
  "Juan Carlos Pérez",
  "juan.carlos@example.com"
);
if (updatedUser) {
  console.log(`Usuario actualizado: ${updatedUser.name}`);
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

async function updateUser(id, name, email) {
  try {
    const response = await axios.put(`http://localhost:3000/users/${id}`, {
      name,
      email,
    });

    const { success, data, message } = response.data;

    if (success) {
      console.log("Usuario actualizado:", data);
      return data;
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      const { error: errorType, message } = data;

      switch (status) {
        case 400:
          console.error(`Error de validación: ${message}`);
          break;
        case 404:
          console.error(`Usuario no encontrado: ${message}`);
          break;
        case 409:
          console.error(`Email duplicado: ${message}`);
          break;
        default:
          console.error(`${errorType}: ${message}`);
      }
    } else {
      console.error("Error de red:", error.message);
    }
  }
}

// Uso
const result = await updateUser(
  1,
  "María García López",
  "maria.garcia@example.com"
);
```

### Python (requests)

```python
import requests

def update_user(user_id, name, email):
    try:
        response = requests.put(f'http://localhost:3000/users/{user_id}',
                              json={'name': name, 'email': email})
        data = response.json()

        if data['success']:
            print(f"Usuario actualizado: {data['data']['name']}")
            return data['data']
        else:
            print(f"Error: {data['message']}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return None

# Uso
user = update_user(1, 'Carlos López Martínez', 'carlos.lopez@example.com')
if user:
    print(f"Email actualizado: {user['email']}")
```

### PHP

```php
<?php
function updateUser($id, $name, $email) {
    $data = json_encode(['name' => $name, 'email' => $email]);

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'PUT',
            'content' => $data
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents("http://localhost:3000/users/{$id}", false, $context);
    $result = json_decode($response, true);

    if ($result['success']) {
        echo "Usuario actualizado: {$result['data']['name']}\n";
        return $result['data'];
    } else {
        echo "Error: {$result['message']}\n";
        return null;
    }
}

// Uso
$user = updateUser(1, 'Ana Martínez García', 'ana.martinez@example.com');
if ($user) {
    echo "ID: {$user['id']}, Email: {$user['email']}\n";
}
?>
```

## 🔍 Casos de uso

- **Perfil de usuario**: Permitir a usuarios actualizar su información
- **Administración**: Modificar datos de usuarios desde panel admin
- **Sincronización**: Actualizar usuarios desde sistemas externos
- **Corrección de datos**: Corregir información incorrecta

## ⚠️ Consideraciones

- **ID válido**: El ID debe corresponder a un usuario existente
- **Campos requeridos**: `name` y `email` son obligatorios
- **Email único**: El nuevo email no puede estar en uso por otro usuario
- **Validación**: Siempre validar datos antes de enviar
- **Manejo de errores**: Implementar manejo específico para cada tipo de error
- **Auditoría**: Considerar logging de cambios para auditoría
