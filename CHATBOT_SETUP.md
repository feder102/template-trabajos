# 🤖 Configuración del Chatbot con Gemini AI

Este documento explica cómo configurar y utilizar el chatbot inteligente en tu sitio web.

---

## 📋 Pasos para Configurar

### 1. Obtener tu Google Gemini API Key

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Create API Key"** o **"Crear clave de API"**
4. Copia la clave generada (guárdala en un lugar seguro)

**Nota**: La API de Gemini tiene un nivel gratuito generoso que incluye:
- 60 solicitudes por minuto
- 1,500 solicitudes por día
- Ideal para sitios web pequeños y medianos

---

### 2. Configurar la API Key en tu sitio

**Paso 1**: Crea un archivo `.env` en la raíz del proyecto (ya existe `.env.example` como plantilla):

```bash
# En la terminal PowerShell
Copy-Item .env.example .env
```

**Paso 2**: Abre el archivo `.env` y reemplaza `TU_API_KEY_AQUI` con tu clave real:

```env
# Configuración del Chatbot con Gemini AI
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Paso 3**: ¡Listo! El chatbot cargará automáticamente la API Key desde el archivo `.env`

**⚠️ IMPORTANTE**: 
- El archivo `.env` está en `.gitignore` para proteger tu API Key
- **NUNCA** subas el archivo `.env` a GitHub
- Solo sube `.env.example` (sin la API Key real)

---

### 3. Personalizar la Información del Bot

Toda la información que el chatbot usa para responder está en el archivo:

```
chatbot-info.md
```

**¿Qué puedes personalizar?**

✅ **Información de contacto** (email, WhatsApp, dirección)  
✅ **Precios de los paquetes**  
✅ **Tiempos de entrega**  
✅ **Servicios ofrecidos**  
✅ **Formas de pago**  
✅ **Promociones vigentes**  
✅ **Casos de éxito**  
✅ **Preguntas frecuentes**  

Simplemente edita el archivo `chatbot-info.md` con tu editor de texto favorito y el chatbot automáticamente usará la nueva información.

---

## 🎨 Personalizar la Apariencia

### Colores del Botón

En `js/chatbot.js`, busca la línea que crea el botón:

```javascript
chatButton.className = 'fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 ...';
```

Cambia `from-primary-600 to-accent-600` por los colores que prefieras:
- `from-blue-600 to-purple-600` (azul a morado)
- `from-green-600 to-teal-600` (verde a turquesa)
- `from-pink-600 to-rose-600` (rosa a rosado)

### Posición del Botón

Por defecto está en `bottom-6 right-6` (abajo a la derecha). Puedes cambiar:
- `bottom-6 left-6` - Abajo a la izquierda
- `top-24 right-6` - Arriba a la derecha
- `bottom-24 right-6` - Más arriba desde abajo

### Tamaño de la Ventana

En `js/chatbot.js`, busca:

```javascript
chatWindow.className = '... w-96 h-[600px] ...';
```

Cambia:
- `w-96` → `w-[500px]` (más ancho)
- `h-[600px]` → `h-[500px]` (más bajo)

---

## 🚀 Funcionalidades del Chatbot

### ✅ Lo que PUEDE hacer:

- ✅ Responder preguntas sobre servicios y precios
- ✅ Explicar diferencias entre paquetes
- ✅ Informar sobre tiempos de entrega
- ✅ Detallar formas de pago
- ✅ Compartir casos de éxito
- ✅ Responder preguntas frecuentes
- ✅ Proporcionar información de contacto
- ✅ Sugerir el mejor paquete según necesidades
- ✅ Explicar el proceso de trabajo
- ✅ Informar sobre promociones

### ❌ Lo que NO puede hacer:

- ❌ Procesar pagos
- ❌ Agendar reuniones automáticamente
- ❌ Acceder a información privada
- ❌ Dar presupuestos personalizados exactos
- ❌ Modificar tu sitio web
- ❌ Reemplazar al contacto humano para consultas complejas

---

## 🔒 Seguridad y Buenas Prácticas

### 1. Proteger tu API Key

**NUNCA** subas tu API key a GitHub u otros repositorios públicos.

**Para producción**, considera:

#### Opción A: Variables de Entorno (Hosting)
Si usas Netlify, Vercel, etc.:
```javascript
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
```

#### Opción B: Servidor Backend
Lo más seguro es hacer las llamadas a Gemini desde tu servidor:
```
Cliente → Tu Servidor → Gemini API
```

#### Opción C: Restricciones de API Key
En Google Cloud Console:
1. Ve a tu API Key
2. Agrega "Application restrictions"
3. Restringe por "HTTP referrers"
4. Agrega tu dominio: `https://tudominio.com/*`

### 2. Límites de Uso

Gemini tiene límites gratuitos:
- **60 solicitudes por minuto**
- **1,500 solicitudes por día**

Si excedes estos límites, considera:
- Upgrade a plan pago
- Implementar caché de respuestas comunes
- Limitar cantidad de mensajes por usuario

### 3. Moderación de Contenido

El chatbot está configurado para:
- Solo responder sobre temas relacionados al negocio
- Redirigir preguntas off-topic amablemente
- Sugerir contacto directo para consultas complejas

---

## 🧪 Probar el Chatbot

### 1. Prueba Local

1. Abre `index.html` en tu navegador
2. Verás el botón flotante en la esquina inferior derecha
3. Haz clic para abrir el chat
4. Prueba con preguntas como:
   - "¿Cuánto cuesta el paquete E-commerce?"
   - "¿Cuáles son las formas de pago?"
   - "¿Cuánto tarda el desarrollo?"
   - "¿Qué tecnologías usan?"

### 2. Preguntas de Prueba Recomendadas

```
✅ "¿Qué paquetes ofrecen?"
✅ "¿Cuál es la diferencia entre Institucional y E-commerce?"
✅ "¿Aceptan MercadoPago?"
✅ "¿Cuánto tarda el desarrollo de una tienda online?"
✅ "¿Ofrecen hosting gratis?"
✅ "¿Puedo actualizar el contenido yo mismo?"
✅ "¿Trabajan con clientes de otros países?"
✅ "¿Cuál es el número de WhatsApp?"
```

### 3. Verificar Errores

Abre la **Consola del Navegador** (F12) y busca:
- ❌ Errores de API Key inválida
- ❌ Errores de conexión
- ⚠️ Warnings sobre configuración

---

## 📊 Monitoreo y Análisis

### Ver Uso de la API

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto
3. Ve a "APIs & Services" → "Dashboard"
4. Verás gráficos de uso de Gemini API

### Métricas Importantes

- 📈 **Solicitudes por día**
- ⏱️ **Tiempo de respuesta promedio**
- ❌ **Tasa de errores**
- 💰 **Costos (si aplica)**

---

## 🛠️ Solución de Problemas

### El chatbot no aparece

✅ **Verifica**:
1. Que `chatbot.js` esté cargado correctamente
2. Que no haya errores en la consola del navegador
3. Que la API Key esté configurada

### Las respuestas son lentas

✅ **Posibles causas**:
- Conexión a internet lenta
- Límite de cuota alcanzado
- Servidor de Gemini con alta demanda

### Respuestas incorrectas

✅ **Solución**:
- Actualiza `chatbot-info.md` con información más clara
- Agrega ejemplos específicos
- Reformula las secciones confusas

### Error "API Key inválida"

✅ **Verifica**:
1. Que la API Key esté copiada correctamente
2. Que la API de Gemini esté habilitada en Google Cloud
3. Que no tenga restricciones que bloqueen tu dominio

---

## 🎯 Mejoras Futuras Sugeridas

### Versión 2.0 (Backend)

- [ ] Mover API Key al servidor (más seguro)
- [ ] Implementar caché de respuestas comunes
- [ ] Agregar analytics de conversaciones
- [ ] Sistema de rating de respuestas
- [ ] Integración con CRM

### Versión 3.0 (Avanzado)

- [ ] Modo de voz (speech-to-text)
- [ ] Respuestas multimodales (imágenes)
- [ ] Integración con WhatsApp Business API
- [ ] Chatbot proactivo (saludos automáticos)
- [ ] A/B testing de respuestas

---

## 📞 Soporte

Si necesitas ayuda con la configuración:

- 📧 **Email**: tresrabas@gmail.com
- 💬 **WhatsApp**: +54 9 264 531-7435

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Gemini Pricing](https://ai.google.dev/pricing)
- [Best Practices](https://ai.google.dev/docs/best_practices)

### Tutoriales

- [Getting Started with Gemini](https://ai.google.dev/tutorials/web_quickstart)
- [Prompt Engineering Guide](https://ai.google.dev/docs/prompt_best_practices)

---

**Última actualización**: Noviembre 2025  
**Versión del Chatbot**: 1.0.0

---

> 💡 **Tip**: Actualiza regularmente `chatbot-info.md` para mantener las respuestas del bot actualizadas con tus servicios y precios.
