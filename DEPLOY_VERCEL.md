# 🚀 Desplegar en Vercel

## Pasos para Desplegar

### 1. Configurar Variable de Entorno en Vercel

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega:

```
GEMINI_API_KEY = llllllGY72jmnW02KJvX_xxxxxx
```

**Importante**: Marca las 3 opciones:
- ✅ Production
- ✅ Preview
- ✅ Development

### 2. Verifica los Archivos

Asegúrate de que estos archivos existan en tu proyecto:

- ✅ `vercel.json` - Configuración de Vercel
- ✅ `api/chat.js` - API endpoint para el chatbot
- ✅ `index.html` - Página principal
- ✅ Todos los archivos JS y CSS

### 3. Hacer Push y Deploy

```bash
git add .
git commit -m "Configuración para Vercel"
git push origin main
```

Vercel detectará automáticamente los cambios y hará el deploy.

### 4. Verificar Funcionamiento

Una vez desplegado:
1. Abre tu URL de Vercel (ej: `https://tu-proyecto.vercel.app`)
2. Prueba el chatbot haciendo clic en el botón flotante
3. Envía un mensaje de prueba

## 🔒 Seguridad

La API Key ahora está protegida en el backend de Vercel y NO se expone en el navegador. Esto es más seguro que tenerla en el archivo `.env` del frontend.

## 🐛 Solución de Problemas

### Si el chatbot no funciona:

1. **Verifica las variables de entorno**:
   - Ve a Vercel → Settings → Environment Variables
   - Confirma que `GEMINI_API_KEY` esté configurada

2. **Revisa los logs**:
   - Ve a Vercel → Deployments → (último deploy) → Function Logs
   - Busca errores en `/api/chat`

3. **Redeploy**:
   ```bash
   vercel --prod
   ```

## 📝 Diferencias Local vs Producción

### Local (desarrollo):
- Usa archivo `.env` local
- Llamada directa a Gemini API desde el navegador
- Requiere servidor local (`python -m http.server 8000`)

### Vercel (producción):
- Variables de entorno de Vercel
- Llamada a través de `/api/chat` (más seguro)
- No requiere servidor, funciona directamente

## ✅ Todo Listo

Tu proyecto ahora está optimizado para funcionar tanto en local como en Vercel sin cambios adicionales. El código detecta automáticamente el entorno y se comporta correctamente.
