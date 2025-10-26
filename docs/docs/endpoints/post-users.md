# POST /users

Crea un nuevo usuario en el sistema.

## 📋 Descripción

Este endpoint permite crear un nuevo usuario con nombre y email. El sistema valida que los campos sean proporcionados y que el email sea único.

## 🔗 Endpoint

```http
POST /users
Content-Type: application/json
```

## 📥 Parámetros de entrada

| Campo   | Tipo     | Requerido | Descripción                 |
| ------- | -------- | --------- | --------------------------- |
| `name`  | `string` | ✅        | Nombre completo del usuario |
| `email` | `string` | ✅        | Email único del usuario     |

### Ejemplo de body

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

## 📤 Respuesta

### ✅ Usuario creado exitosamente (201)

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

### ❌ Error de validación (400)

```json
{
  "success": false,
  "error": "Validation error",
  "message": "Name and email are required"
}
```

### ❌ Email duplicado (409)

```json
{
  "success": false,
  "error": "Email already exists",
  "message": "The email 'juan@example.com' is already registered"
}
```

### ❌ Error del servidor (500)

```json
{
  "success": false,
  "error": "Database error",
  "message": "Failed to create user"
}
```

## 💻 Ejemplos de uso

### cURL

```bash
# Crear usuario exitosamente
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }'

# Error de validación (campos faltantes)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez"
  }'

# Error de email duplicado
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "email": "juan@example.com"
  }'
```

### JavaScript (Fetch API)

```javascript
async function createUser(name, email) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Usuario creado:", data.data);
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
const newUser = await createUser("Juan Pérez", "juan@example.com");
if (newUser) {
  console.log(`Usuario creado con ID: ${newUser.id}`);
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

async function createUser(name, email) {
  try {
    const response = await axios.post("http://localhost:3000/users", {
      name,
      email,
    });

    const { success, data, message } = response.data;

    if (success) {
      console.log("Usuario creado:", data);
      return data;
    }
  } catch (error) {
    if (error.response) {
      const { error: errorType, message } = error.response.data;
      console.error(`${errorType}: ${message}`);
    } else {
      console.error("Error de red:", error.message);
    }
  }
}

// Uso
const newUser = await createUser("María García", "maria@example.com");
```

### Python (requests)

```python
import requests

def create_user(name, email):
    try:
        response = requests.post('http://localhost:3000/users',
                               json={'name': name, 'email': email})
        data = response.json()

        if data['success']:
            print(f"Usuario creado: {data['data']['name']}")
            return data['data']
        else:
            print(f"Error: {data['message']}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return None

# Uso
user = create_user('Carlos López', 'carlos@example.com')
if user:
    print(f"ID asignado: {user['id']}")
```

### PHP

```php
<?php
function createUser($name, $email) {
    $data = json_encode(['name' => $name, 'email' => $email]);

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => $data
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents('http://localhost:3000/users', false, $context);
    $result = json_decode($response, true);

    if ($result['success']) {
        echo "Usuario creado: {$result['data']['name']}\n";
        return $result['data'];
    } else {
        echo "Error: {$result['message']}\n";
        return null;
    }
}

// Uso
$user = createUser('Ana Martínez', 'ana@example.com');
if ($user) {
    echo "ID: {$user['id']}\n";
}
?>
```

## 🔍 Casos de uso

- **Registro de usuarios**: Formularios de registro
- **Importación de datos**: Crear usuarios desde archivos CSV/Excel
- **API de terceros**: Integración con sistemas externos
- **Migración de datos**: Transferir usuarios de otro sistema

## ⚠️ Consideraciones

- **Validación**: Siempre validar datos antes de enviar
- **Email único**: Verificar que el email no esté en uso
- **Campos requeridos**: `name` y `email` son obligatorios
- **Manejo de errores**: Implementar manejo robusto de errores
- **Seguridad**: En producción, considerar validación adicional
