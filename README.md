# Plataforma de Gestión de Suscripciones Digitales

## 📝 Descripción
Aplicación web para gestionar suscripciones digitales como Netflix, Spotify, etc. Permite a los usuarios mantener un control de sus servicios de suscripción digital.

## ✨ Características
- Autenticación de usuarios
- Gestión de suscripciones (CRUD)
- Interfaz responsiva
- Rutas protegidas
- Validaciones visuales con SweetAlert2

## 🛠 Tecnologías
- React
- React Router DOM
- SweetAlert2
- API REST (https://api-prueba-uno.onrender.com/)

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

## 💻 Uso
1. Acceder a la aplicación
2. Iniciar sesión o registrarse
3. Gestionar suscripciones:
   - Ver lista de suscripciones
   - Agregar nueva suscripción
   - Editar suscripción existente
   - Eliminar suscripción

## 🔑 Endpoints API
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /suscripciones` - Obtener lista de suscripciones
- `POST /suscripciones` - Crear suscripción
- `PUT /suscripciones/:id` - Actualizar suscripción
- `DELETE /suscripciones/:id` - Eliminar suscripción

## 🔐 Variables de Entorno
```env
VITE_API_URL=https://api-prueba-uno.onrender.com
```


## 📄 Licencia
MIT

##
El proyecto se entrego hoy por que vercel me daba errores ayer y no dejaba subir el proyecto