# Backend Koywe Test

## 🚀 Levantar la aplicación localmente con Docker Compose

1. **Clona el repositorio y entra a la carpeta del backend:**
   ```bash
   git clone <url-del-repo>
   ```

2. **Copia el archivo de variables de entorno de ejemplo y edítalo si es necesario:**
   ```bash
   cp .env.example .env
   ```

3. **Levanta los servicios con Docker Compose:**
   ```bash
   docker-compose -f docker-compose.local.yml up --build
   ```
   Esto levantará la API en `http://localhost:4000` y una base de datos MongoDB en el puerto `27017`.

## Ruta http://localhost:4000/api tiene documentacion de los distintos endpoints

---

## ⚙️ Variables de entorno

Debes crear un archivo `.env` en la raíz del backend. Puedes usar el archivo `.env.example` como base:

```env
# .env.example
MONGODB_URI=mongodb://mongodb:27017/koywe
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

**Variables principales:**
- `MONGODB_URI`: URL de conexión a MongoDB.
- `JWT_SECRET`: Secreto para firmar los JWT.
- `JWT_EXPIRES_IN`: Tiempo de expiración del JWT.
- `EXCHANGE_API_URL`: URL del servicio de tasas de cambio.

---

## 🗄️ Base de datos

- **Base de datos:** MongoDB (se levanta automáticamente con Docker Compose).
- **Configuración especial:** No requiere configuración adicional, la conexión se realiza usando la variable `MONGODB_URI`.

---

## 📚 Notas adicionales

- El código fuente está en la carpeta `src/`.
- El endpoint principal de la API estará disponible en `http://localhost:4000`.
- Para desarrollo, los cambios en el código se reflejan automáticamente gracias al volumen montado en Docker.

---

## Aplicaciones de IA

- Agilizar la parte de authenticacion con JWT, con explicaciones mas que generacion de codigo
- Creacion de este Readme
- Creacion de test de servicios utilizando codex de openAI