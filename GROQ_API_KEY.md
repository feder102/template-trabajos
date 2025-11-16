# 🎯 Cómo obtener tu API Key de Groq (GRATIS)

## ¿Por qué Groq?

- ✅ **100% GRATIS** (sin tarjeta de crédito)
- ⚡ **Súper rápido** (más rápido que Gemini)
- 🎁 **Límites generosos**: 30 requests/minuto, 14,400/día
- 🤖 **Modelo potente**: Llama 3.1 70B

## Pasos para obtener tu API Key:

### 1. Crear cuenta en Groq

Ve a: **https://console.groq.com**

1. Haz clic en "Sign Up" o "Get Started"
2. Regístrate con tu email o cuenta de Google
3. Verifica tu email si es necesario

### 2. Obtener tu API Key

1. Una vez dentro, ve a: **https://console.groq.com/keys**
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "WebPro Chatbot")
4. Copia la API Key (empieza con `gsk_...`)

### 3. Configurar en tu proyecto

#### Desarrollo local:

Edita `.env.local`:

```env
VITE_GROQ_API_KEY=gsk_tu_api_key_aqui
```

#### Producción (Vercel):

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - **Name**: `GROQ_API_KEY`
   - **Value**: `gsk_tu_api_key_aqui`
   - Marca: Production, Preview, Development

### 4. Listo!

Reinicia tu servidor de desarrollo:

```bash
npm run dev
```

El chatbot ahora usa Groq AI y **NO tendrás más errores 429**! 🎉

## 📊 Límites de Groq (GRATIS)

- **30 requests por minuto**
- **14,400 requests por día**
- **6,000 tokens por request**
- Sin costo, sin tarjeta de crédito

## 🆚 Comparación

| Característica | Groq (Llama 3.1) | Gemini Flash |
|---------------|------------------|--------------|
| Precio | **GRATIS** | GRATIS |
| Límite/min | **30** | 15 |
| Límite/día | **14,400** | 1,500 |
| Velocidad | **⚡ Muy rápida** | Rápida |
| Calidad | Excelente | Excelente |
| Registro | Sin tarjeta | Sin tarjeta |

## 🔗 Links útiles

- **Consola de Groq**: https://console.groq.com
- **Documentación**: https://console.groq.com/docs
- **Playground**: https://console.groq.com/playground
