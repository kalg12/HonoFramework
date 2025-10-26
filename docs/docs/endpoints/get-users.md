# GET /users

Obtiene todos los usuarios registrados en el sistema.

## 📋 Descripción

Este endpoint retorna una lista completa de todos los usuarios almacenados en la base de datos, incluyendo información detallada de cada uno.

## 🔗 Endpoint

```http
GET /users
```

## 📤 Respuesta

### ✅ Éxito (200)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "id": 2,
      "name": "María García",
      "email": "maria@example.com"
    },
    {
      "id": 3,
      "name": "Carlos López",
      "email": "carlos@example.com"
    }
  ],
  "count": 3
}
```

### 📊 Campos de respuesta

| Campo          | Tipo      | Descripción                        |
| -------------- | --------- | ---------------------------------- |
| `success`      | `boolean` | Indica si la operación fue exitosa |
| `data`         | `array`   | Lista de usuarios                  |
| `count`        | `number`  | Número total de usuarios           |
| `data[].id`    | `number`  | ID único del usuario               |
| `data[].name`  | `string`  | Nombre completo del usuario        |
| `data[].email` | `string`  | Email del usuario                  |

## 💻 Ejemplos de uso

### cURL

```bash
curl -X GET http://localhost:3000/users \
  -H "Content-Type: application/json"
```

### JavaScript (Fetch API)

```javascript
const response = await fetch("http://localhost:3000/users");
const data = await response.json();

if (data.success) {
  console.log(`Se encontraron ${data.count} usuarios:`);
  data.data.forEach((user) => {
    console.log(`- ${user.name} (${user.email})`);
  });
} else {
  console.error("Error:", data.error);
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

try {
  const response = await axios.get("http://localhost:3000/users");
  const { success, data, count } = response.data;

  if (success) {
    console.log(`Usuarios encontrados: ${count}`);
    data.forEach((user) => {
      console.log(`${user.id}: ${user.name} - ${user.email}`);
    });
  }
} catch (error) {
  console.error(
    "Error al obtener usuarios:",
    error.response?.data || error.message
  );
}
```

### Python (requests)

```python
import requests

response = requests.get('http://localhost:3000/users')
data = response.json()

if data['success']:
    print(f"Se encontraron {data['count']} usuarios:")
    for user in data['data']:
        print(f"- {user['name']} ({user['email']})")
else:
    print(f"Error: {data.get('error', 'Error desconocido')}")
```

### PHP

```php
<?php
$response = file_get_contents('http://localhost:3000/users');
$data = json_decode($response, true);

if ($data['success']) {
    echo "Se encontraron {$data['count']} usuarios:\n";
    foreach ($data['data'] as $user) {
        echo "- {$user['name']} ({$user['email']})\n";
    }
} else {
    echo "Error: " . $data['error'] . "\n";
}
?>
```

## 🔍 Casos de uso

- **Dashboard de administración**: Mostrar lista completa de usuarios
- **Sincronización de datos**: Obtener todos los usuarios para procesamiento
- **Reportes**: Generar estadísticas de usuarios registrados
- **Backup**: Exportar datos de usuarios

## ⚠️ Consideraciones

- **Rendimiento**: Con muchos usuarios, considera implementar paginación
- **Caché**: Los datos pueden ser cacheados para mejorar rendimiento
- **Seguridad**: En producción, considera autenticación y autorización
