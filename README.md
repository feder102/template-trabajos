# 🚀 Template de Trabajos - Sitio Web Profesional

Plantilla profesional para servicios de desarrollo web con chatbot IA integrado.

## 📋 Características

- ✅ **Diseño Moderno**: Paleta azul marino + dorado (confianza y elegancia)
- ✅ **Modo Oscuro**: Toggle en header con persistencia
- ✅ **Chatbot IA**: Integrado con Groq AI (llama-3.3-70b-versatile)
- ✅ **3 Paquetes**: Institucional, E-commerce, Automatización
- ✅ **Responsive**: Perfecto en móvil, tablet y desktop
- ✅ **Optimizado**: Vite + Tailwind CSS para máximo rendimiento

## 🛠️ Tecnologías

- **Build Tool**: Vite 7.2.2
- **CSS Framework**: Tailwind CSS 3.4.18
- **AI API**: Groq (gratis, 30 req/min)
- **Deployment**: Vercel
- **Backend**: Vercel Serverless Functions

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
echo "VITE_GROQ_API_KEY=tu_clave_aqui" > .env

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 📁 Estructura del Proyecto

Ver [docs/ESTRUCTURA.md](docs/ESTRUCTURA.md) para detalles completos.

```
├── index.html              # Página principal
├── src/                    # Código fuente
│   ├── main.js            # Entry point
│   ├── chatbot.js         # Chatbot con IA
│   ├── theme.js           # Modo oscuro
│   └── styles.css         # Estilos
├── public/                # Archivos estáticos
│   ├── chatbot-info.md   # Contexto del bot
│   └── assets/           # Imágenes
├── api/                   # Serverless functions
│   └── chat.js           # Endpoint API
└── docs/                  # Documentación
```

## 🔑 Configuración de API Key

1. Obtén tu API key gratis en [Groq Console](https://console.groq.com/keys)
2. Crea archivo `.env`:
   ```
   VITE_GROQ_API_KEY=tu_clave_aqui
   ```
3. Para producción, configura en Vercel Dashboard

Ver guía completa: [docs/GROQ_API_KEY.md](docs/GROQ_API_KEY.md)

## 🚢 Deploy en Vercel

1. Push a GitHub
2. Importa en Vercel
3. Configura variable `VITE_GROQ_API_KEY`
4. Deploy automático ✨

Guía detallada: [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md)

## 🎨 Personalización

### Colores
Edita `tailwind.config.js`:
```js
colors: {
  primary: { ... },  // Azul marino
  accent: { ... }    // Dorado
}
```

### Contenido del Chatbot
Edita `public/chatbot-info.md` con tu información.

### Paquetes y Precios
Edita las tarjetas en `index.html`.

## 📝 Scripts

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build producción
npm run preview  # Preview del build
```

## 📄 Licencia

MIT

## 👤 Autor

**Fede** - [tresrabas@gmail.com](mailto:tresrabas@gmail.com)

---

**📞 WhatsApp**: +54 9 264 531-7435
