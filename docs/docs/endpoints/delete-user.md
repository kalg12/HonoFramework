# DELETE /users/:id

Elimina un usuario del sistema de manera permanente.

## 📋 Descripción

Este endpoint permite eliminar un usuario específico del sistema utilizando su ID único. La eliminación es permanente y no se puede deshacer.

## 🔗 Endpoint

```http
DELETE /users/:id
```

### Parámetros de URL

| Parámetro | Tipo     | Requerido | Descripción                     |
| --------- | -------- | --------- | ------------------------------- |
| `id`      | `number` | ✅        | ID único del usuario a eliminar |

## 📤 Respuesta

### ✅ Usuario eliminado exitosamente (200)

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

### ❌ Usuario no encontrado (404)

```json
{
  "success": false,
  "error": "User not found",
  "message": "No user found with ID: 999"
}
```

### ❌ Error del servidor (500)

```json
{
  "success": false,
  "error": "Database error",
  "message": "Failed to delete user"
}
```

### 📊 Campos de respuesta

| Campo              | Tipo      | Descripción                           |
| ------------------ | --------- | ------------------------------------- |
| `success`          | `boolean` | Indica si la operación fue exitosa    |
| `message`          | `string`  | Mensaje descriptivo del resultado     |
| `data`             | `object`  | Datos de la operación (solo en éxito) |
| `data.id`          | `number`  | ID del usuario eliminado              |
| `data.deletedRows` | `number`  | Número de filas afectadas             |
| `error`            | `string`  | Tipo de error (solo en error)         |

## 💻 Ejemplos de uso

### cURL

```bash
# Eliminar usuario exitosamente
curl -X DELETE http://localhost:3000/users/1 \
  -H "Content-Type: application/json"

# Usuario no encontrado
curl -X DELETE http://localhost:3000/users/999 \
  -H "Content-Type: application/json"
```

### JavaScript (Fetch API)

```javascript
async function deleteUser(id) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log("Usuario eliminado:", data.message);
      console.log(`ID eliminado: ${data.data.id}`);
      return true;
    } else {
      console.error("Error:", data.error, data.message);
      return false;
    }
  } catch (error) {
    console.error("Error de red:", error);
    return false;
  }
}

// Uso
const deleted = await deleteUser(1);
if (deleted) {
  console.log("Usuario eliminado exitosamente");
}
```

### JavaScript (Axios)

```javascript
import axios from "axios";

async function deleteUser(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/users/${id}`);
    const { success, data, message } = response.data;

    if (success) {
      console.log(message);
      console.log(`Usuario ID ${data.id} eliminado`);
      return true;
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      const { error: errorType, message } = data;

      switch (status) {
        case 404:
          console.error(`Usuario no encontrado: ${message}`);
          break;
        case 500:
          console.error(`Error del servidor: ${message}`);
          break;
        default:
          console.error(`${errorType}: ${message}`);
      }
    } else {
      console.error("Error de red:", error.message);
    }
    return false;
  }
}

// Uso
const success = await deleteUser(1);
if (success) {
  console.log("Operación completada");
}
```

### Python (requests)

```python
import requests

def delete_user(user_id):
    try:
        response = requests.delete(f'http://localhost:3000/users/{user_id}')
        data = response.json()

        if data['success']:
            print(data['message'])
            print(f"Usuario ID {data['data']['id']} eliminado")
            return True
        else:
            print(f"Error: {data['message']}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión: {e}")
        return False

# Uso
success = delete_user(1)
if success:
    print("Usuario eliminado exitosamente")
```

### PHP

```php
<?php
function deleteUser($id) {
    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'DELETE'
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents("http://localhost:3000/users/{$id}", false, $context);
    $result = json_decode($response, true);

    if ($result['success']) {
        echo $result['message'] . "\n";
        echo "Usuario ID {$result['data']['id']} eliminado\n";
        return true;
    } else {
        echo "Error: {$result['message']}\n";
        return false;
    }
}

// Uso
$success = deleteUser(1);
if ($success) {
    echo "Operación completada\n";
}
?>
```

## 🔍 Casos de uso

- **Eliminación de cuenta**: Permitir a usuarios eliminar su cuenta
- **Administración**: Eliminar usuarios desde panel de administración
- **Limpieza de datos**: Eliminar usuarios inactivos o duplicados
- **Cumplimiento GDPR**: Eliminar datos por solicitud de usuario

## ⚠️ Consideraciones importantes

### ⚠️ **Eliminación permanente**

- **No reversible**: La eliminación es permanente y no se puede deshacer
- **Sin papelera**: No existe papelera de reciclaje para usuarios eliminados
- **Datos relacionados**: Considerar impacto en datos relacionados

### 🔒 **Seguridad**

- **Autenticación**: En producción, requerir autenticación
- **Autorización**: Verificar permisos para eliminar usuarios
- **Confirmación**: Implementar confirmación antes de eliminar

### 📊 **Auditoría**

- **Logging**: Registrar todas las eliminaciones para auditoría
- **Backup**: Mantener backups antes de eliminaciones masivas
- **Soft delete**: Considerar eliminación lógica en lugar de física

### 🚨 **Mejores prácticas**

- **Validación**: Verificar que el usuario existe antes de eliminar
- **Manejo de errores**: Implementar manejo robusto de errores
- **Confirmación**: Solicitar confirmación del usuario antes de eliminar
- **Notificación**: Notificar al usuario sobre la eliminación exitosa
