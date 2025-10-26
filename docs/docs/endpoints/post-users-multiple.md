# POST /users/multiple

Crea múltiples usuarios de manera simultánea en una sola operación.

## 📋 Descripción

Este endpoint permite crear varios usuarios en una sola transacción, lo que es más eficiente que hacer múltiples llamadas individuales. Si cualquier usuario falla, toda la operación se revierte.

## 🔗 Endpoint

```http
POST /users/multiple
Content-Type: application/json
```

## 📥 Parámetros de entrada

| Campo   | Tipo    | Requerido | Descripción              |
| ------- | ------- | --------- | ------------------------ |
| `users` | `array` | ✅        | Array de objetos usuario |

### Estructura de cada usuario

| Campo   | Tipo     | Requerido | Descripción                 |
| ------- | -------- | --------- | --------------------------- |
| `name`  | `string` | ✅        | Nombre completo del usuario |
| `email` | `string` | ✅        | Email único del usuario     |

### Ejemplo de body

```json
[
  {
    "name": "Juan Pérez",
    "email": "juan@example.com"
  },
  {
    "name": "María García",
    "email": "maria@example.com"
  },
  {
    "name": "Carlos López",
    "email": "carlos@example.com"
  }
]
```

## 📤 Respuesta

### ✅ Usuarios creados exitosamente (201)

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
    },
    {
      "id": 6,
      "name": "Carlos López",
      "email": "carlos@example.com"
    }
  ]
}
```

### ❌ Error de validación (400)

```json
{
  "success": false,
  "error": "Validation error",
  "message": "Expected an array of users"
}
```

### ❌ Error del servidor (500)

```json
{
  "success": false,
  "error": "Database error",
  "message": "Failed to create users"
}
```

## 💻 Ejemplos de uso

### cURL

```bash
# Crear múltiples usuarios
curl -X POST http://localhost:3000/users/multiple \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "name": "María García",
      "email": "maria@example.com"
    },
    {
      "name": "Carlos López",
      "email": "carlos@example.com"
    }
  ]'

# Error de validación (no es array)
curl -X POST http://localhost:3000/users/multiple \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }'
```

### JavaScript (Fetch API)

```javascript
async function createMultipleUsers(users) {
  try {
    const response = await fetch("http://localhost:3000/users/multiple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });

    const data = await response.json();

    if (data.success) {
      console.log(`${data.message}`);
      console.log("Usuarios creados:", data.data);
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
const usersToCreate = [
  { name: "Juan Pérez", email: "juan@example.com" },
  { name: "María García", email: "maria@example.com" },
  { name: "Carlos López", email: "carlos@example.com" },
];

const createdUsers = await createMultipleUsers(usersToCreate);
if (createdUsers) {
  console.log(`Se crearon ${createdUsers.length} usuarios`);
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

async function createMultipleUsers(users) {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/multiple",
      users
    );
    const { success, data, message } = response.data;

    if (success) {
      console.log(message);
      console.log("Usuarios creados:", data);
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
const users = [
  { name: "Ana Martínez", email: "ana@example.com" },
  { name: "Pedro Rodríguez", email: "pedro@example.com" },
];

const result = await createMultipleUsers(users);
```

### Python (requests)

```python
import requests

def create_multiple_users(users):
    try:
        response = requests.post('http://localhost:3000/users/multiple',
                              json=users)
        data = response.json()

        if data['success']:
            print(data['message'])
            print(f"Usuarios creados: {len(data['data'])}")
            return data['data']
        else:
            print(f"Error: {data['message']}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return None

# Uso
users_to_create = [
    {'name': 'Juan Pérez', 'email': 'juan@example.com'},
    {'name': 'María García', 'email': 'maria@example.com'},
    {'name': 'Carlos López', 'email': 'carlos@example.com'}
]

created_users = create_multiple_users(users_to_create)
if created_users:
    for user in created_users:
        print(f"ID {user['id']}: {user['name']}")
```

### PHP

```php
<?php
function createMultipleUsers($users) {
    $data = json_encode($users);

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => $data
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents('http://localhost:3000/users/multiple', false, $context);
    $result = json_decode($response, true);

    if ($result['success']) {
        echo $result['message'] . "\n";
        echo "Usuarios creados: " . count($result['data']) . "\n";
        return $result['data'];
    } else {
        echo "Error: {$result['message']}\n";
        return null;
    }
}

// Uso
$users = [
    ['name' => 'Juan Pérez', 'email' => 'juan@example.com'],
    ['name' => 'María García', 'email' => 'maria@example.com'],
    ['name' => 'Carlos López', 'email' => 'carlos@example.com']
];

$createdUsers = createMultipleUsers($users);
if ($createdUsers) {
    foreach ($createdUsers as $user) {
        echo "ID {$user['id']}: {$user['name']}\n";
    }
}
?>
```

## 🔍 Casos de uso

- **Importación masiva**: Cargar usuarios desde archivos CSV/Excel
- **Migración de datos**: Transferir usuarios de otro sistema
- **Sincronización**: Crear usuarios desde sistemas externos
- **Bulk operations**: Operaciones en lote para mejor rendimiento

## ⚠️ Consideraciones

- **Transacción atómica**: Si un usuario falla, todos se revierten
- **Validación**: Cada usuario debe tener `name` y `email` válidos
- **Emails únicos**: No se permiten emails duplicados
- **Rendimiento**: Más eficiente que múltiples llamadas individuales
- **Límites**: Considerar límites de tamaño para arrays grandes
- **Manejo de errores**: Implementar manejo robusto de errores de transacción
