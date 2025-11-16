# 🚀 Deploy en Vercel con Vite

## Pasos para Desplegar

### 1. Configurar Variable de Entorno en Vercel

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega:

```
GEMINI_API_KEY = tu_api_key_aqui
```

**Importante**: Marca las 3 opciones:
- ✅ Production
- ✅ Preview
- ✅ Development

### 2. Verifica los Archivos

Asegúrate de que estos archivos existan en tu proyecto:

- ✅ `vite.config.js` - Configuración de Vite
- ✅ `vercel.json` - Configuración de Vercel  
- ✅ `api/chat.js` - API endpoint para el chatbot
- ✅ `src/main.js` - Punto de entrada
- ✅ `index.html` - Página principal

### 3. Hacer Push y Deploy

```bash
git add .
git commit -m "Migración a Vite"
git push origin main
```

Vercel detectará automáticamente el proyecto Vite y hará el deploy.

### 4. Verificar Funcionamiento

Una vez desplegado:
1. Abre tu URL de Vercel (ej: `https://tu-proyecto.vercel.app`)
2. Prueba el chatbot haciendo clic en el botón flotante
3. Envía un mensaje de prueba

## 🔧 Build Settings (Detectado automáticamente)

Vercel configura automáticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔒 Seguridad

La API Key está protegida en el backend de Vercel (archivo `/api/chat.js`) y NO se expone en el navegador.

## 🐛 Solución de Problemas

### Si el chatbot no funciona:

1. **Verifica las variables de entorno**:
   - Ve a Vercel → Settings → Environment Variables
   - Confirma que `GEMINI_API_KEY` esté configurada

2. **Revisa los logs**:
   - Ve a Vercel → Deployments → (último deploy) → Function Logs
   - Busca errores en `/api/chat`

3. **Redeploy manualmente**:
   ```bash
   vercel --prod
   ```

## 📝 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar .env.local
copy .env.example .env.local
# Edita .env.local con tu API Key

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## ✅ Ventajas de Vite

- ⚡ Hot Module Replacement ultrarrápido
- 📦 Build optimizado con tree-shaking
- 🔧 Zero config
- 🚀 Deploy instantáneo en Vercel
