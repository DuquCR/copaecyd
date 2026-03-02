# Copa ECYD Mérida 2026

Página web para el torneo de fútbol juvenil católico Copa ECYD en Mérida, Yucatán, México.

## Stack Tecnológico

- **Next.js 14** (App Router) — Framework React con SSR
- **Tailwind CSS** — Estilos utilitarios
- **Google Sheets API v4** — Base de datos para inscripciones, tabla y calendario
- **NextAuth.js** — Autenticación con Google OAuth
- **MongoDB Atlas** — Control de roles de usuario
- **Stripe** — Pagos individuales de inscripción

## Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
app/
├── page.tsx                    → Inicio (banner + cuenta regresiva)
├── inscripciones/page.tsx      → Formulario de inscripción
├── tabla/page.tsx              → Tabla de posiciones
├── calendario/page.tsx         → Calendario de partidos
├── documentos/page.tsx         → Documentos descargables
├── admin/                      → Panel de administración
└── api/                        → API Routes
    ├── auth/                   → NextAuth endpoints
    ├── inscripciones/          → POST inscripciones → Google Sheets
    ├── equipos/                → GET equipos filtrados
    ├── tabla/                  → GET tabla de posiciones
    ├── calendario/             → GET calendario de partidos
    ├── admin/resultados/       → PUT actualizar resultados
    └── webhooks/stripe/        → Stripe payment webhooks
```

## Configuración de Servicios

### Google Sheets API
1. Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com)
2. Habilita la API de Google Sheets
3. Crea un Service Account y descarga las credenciales
4. Comparte tu spreadsheet con el email del Service Account
5. Pega las credenciales en `.env.local`

### Google OAuth (para admin login)
1. En el mismo proyecto de Google Cloud, ve a "Credentials"
2. Crea un "OAuth 2.0 Client ID" (tipo Web Application)
3. Agrega `http://localhost:3000/api/auth/callback/google` como redirect URI
4. Pega Client ID y Client Secret en `.env.local`

### MongoDB Atlas
1. Crea un cluster gratuito (M0) en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un usuario de base de datos
3. Agrega tu IP a la whitelist (o 0.0.0.0/0 para desarrollo)
4. Copia el connection string a `.env.local`
5. Agrega manualmente los emails de admins a la colección `users`:
   ```json
   { "email": "admin@gmail.com", "name": "Admin", "role": "admin" }
   ```

### Stripe
1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén tus API keys del Dashboard
3. Configura un webhook apuntando a `/api/webhooks/stripe`
4. Pega las keys en `.env.local`

## Imágenes y Assets

Los siguientes archivos deben ser agregados manualmente en `/public/`:

| Archivo | Dimensiones | Descripción |
|---------|-------------|-------------|
| `logo.png` | 400×400px PNG transparente | Logo principal |
| `logo-white.png` | 400×400px PNG transparente | Logo blanco para footer |
| `banner.jpg` | 1920×1080px | Imagen de fondo del hero |
| `favicon.ico` | 32×32px | Ícono de pestaña |
| `docs/*.pdf` | — | Documentos descargables |

## Despliegue en Vercel

```bash
npm install -g vercel
vercel
```

Agrega todas las variables de `.env.local` en el dashboard de Vercel.
