# 📁 Estructura del Proyecto

## Organización de Directorios

```
template-trabajos/
├── 📄 index.html              # Página principal
├── 📦 package.json            # Dependencias del proyecto
├── ⚙️ vite.config.js          # Configuración de Vite
├── 🎨 tailwind.config.js      # Configuración de Tailwind CSS
├── 📝 postcss.config.js       # Configuración de PostCSS
├── 🚀 vercel.json             # Configuración de Vercel
│
├── 📂 src/                    # Código fuente
│   ├── main.js                # Punto de entrada principal
│   ├── styles.css             # Estilos globales
│   ├── theme.js               # Lógica del modo oscuro
│   └── chatbot.js             # Chatbot con Groq AI
│
├── 📂 public/                 # Archivos estáticos (se copian a dist/)
│   ├── chatbot-info.md        # Información del chatbot
│   └── assets/                # Imágenes y recursos
│       ├── favicon.svg
│       ├── hero-illustration.svg
│       └── placeholder-project.svg
│
├── 📂 api/                    # Serverless functions (Vercel)
│   └── chat.js                # Endpoint de API para Groq
│
├── 📂 docs/                   # Documentación
│   ├── ESTRUCTURA.md          # Este archivo
│   ├── DEPLOY_VERCEL.md       # Guía de deployment
│   └── GROQ_API_KEY.md        # Guía de API key
│
└── 📂 dist/                   # Build de producción (generado)
    └── ...
```

## Descripción de Archivos Clave

### Configuración Principal
- **index.html**: HTML principal con estructura completa del sitio
- **package.json**: Dependencias (Vite, Tailwind, PostCSS)
- **vite.config.js**: Puerto 3000, output a `dist/`
- **tailwind.config.js**: Paleta azul marino + dorado, dark mode
- **vercel.json**: Build command, output directory

### Código Fuente (`src/`)
- **main.js**: Inicializa chatbot, theme toggle, menú móvil
- **styles.css**: Estilos de Tailwind + animaciones custom
- **theme.js**: Toggle de modo oscuro con localStorage
- **chatbot.js**: Integración con Groq AI (llama-3.3-70b-versatile)

### Archivos Públicos (`public/`)
- **chatbot-info.md**: Contexto del chatbot (paquetes, precios, FAQ)
- **assets/**: Imágenes y recursos estáticos

### API Backend (`api/`)
- **chat.js**: Serverless function que protege la API key de Groq

### Documentación (`docs/`)
- Guías de deployment y configuración

## Variables de Entorno

### Desarrollo (.env)
```
VITE_GROQ_API_KEY=tu_clave_aqui
```

### Producción (Vercel)
```
VITE_GROQ_API_KEY=tu_clave_aqui
```

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 3000)
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Flujo de Build

1. **Desarrollo**: `npm run dev` → Vite hot reload en localhost:3000
2. **Build**: `npm run build` → Genera `dist/` con todo optimizado
3. **Deploy**: Push a GitHub → Vercel detecta cambios → Build automático

## Tecnologías

- **Framework**: Vite 7.2.2
- **Estilos**: Tailwind CSS 3.4.18
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Hosting**: Vercel
- **Serverless**: Vercel Functions
