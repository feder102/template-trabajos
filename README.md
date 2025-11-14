# 🚀 WebPro - Plantilla de Desarrollo Web Profesional

Una plantilla moderna y profesional para presentar servicios de desarrollo web a clientes. Diseñada con Tailwind CSS y optimizada para conversiones.

![WebPro Template](./assets/hero-illustration.svg)

## ✨ Características

- 🎨 **Diseño Moderno**: Gradientes, animaciones suaves y efectos glassmorphism
- 📱 **Totalmente Responsivo**: Se adapta perfectamente a móviles, tablets y desktop
- ⚡ **Alto Rendimiento**: Optimizado para carga rápida y mejor SEO
- 🎯 **Orientado a Conversión**: Estructura diseñada para convertir visitantes en clientes
- ♿ **Accesible**: Cumple con estándares de accesibilidad web
- 🔧 **Fácil Personalización**: Código limpio y bien documentado

## 📦 Estructura del Proyecto

```
template-trabajos/
│
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos personalizados
├── js/
│   └── main.js            # JavaScript principal
├── assets/
│   ├── favicon.svg        # Favicon del sitio
│   ├── hero-illustration.svg
│   └── placeholder-project.svg
└── README.md              # Este archivo
```

## 🚀 Inicio Rápido

### Opción 1: Abrir directamente
Simplemente abre el archivo `index.html` en tu navegador favorito.

### Opción 2: Servidor local (Recomendado)
Para una mejor experiencia de desarrollo, usa un servidor local:

```bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx serve

# Si tienes PHP instalado
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 🎨 Personalización

### 1. Colores y Marca
Edita las clases de Tailwind CSS en `index.html` para cambiar colores:
- Busca `teal` y reemplázalo con tu color preferido (blue, purple, indigo, etc.)
- Cambia el logo en la navegación (sección `<header>`)

### 2. Contenido
Reemplaza los siguientes elementos con tu información:

- **Logo/Nombre**: Líneas 10-15 del header
- **Precios**: Busca `[Precio Institucional]`, `[Precio E-commerce]`, etc.
- **Información de contacto**: En el footer (📧, 📱, 📍)
- **Testimonios**: Sección testimonios con casos reales

### 3. Imágenes
- Agrega tus propias imágenes en la carpeta `assets/`
- Reemplaza los SVG placeholder con imágenes reales de proyectos

### 4. SEO
Actualiza los meta tags en el `<head>`:
```html
<meta name="description" content="Tu descripción">
<meta name="keywords" content="tus, palabras, clave">
<meta name="author" content="Tu Nombre">
```

## 📋 Secciones Incluidas

1. **Hero/Inicio** - Presentación impactante con estadísticas
2. **Paquetes** - 3 opciones de servicios (Institucional, E-commerce, Automatización)
3. **Características** - Beneficios incluidos en todos los paquetes
4. **Proceso** - Flujo de trabajo en 3 pasos
5. **Testimonios** - Casos de éxito de clientes
6. **Contacto** - Footer con información de contacto y redes sociales

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Tailwind CSS** - Framework CSS via CDN
- **JavaScript Vanilla** - Sin dependencias externas
- **CSS3** - Animaciones y efectos personalizados
- **SVG** - Gráficos vectoriales escalables

## 🎯 Características de JavaScript

- ✅ Navegación con scroll spy
- ✅ Smooth scroll
- ✅ Menú móvil responsive
- ✅ Animaciones al hacer scroll
- ✅ Contadores animados
- ✅ Hover effects en tarjetas
- ✅ Throttling para optimización

## 📱 Compatibilidad

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Móviles iOS y Android

## 🔧 Personalización Avanzada

### Cambiar Fuentes
```html
<!-- En el <head>, reemplaza la URL de Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE&display=swap" rel="stylesheet">
```

### Agregar Formulario de Contacto
Descomentar la función `initContactForm()` en `js/main.js` y agregar el HTML del formulario.

### Integrar con Backend
Conecta el formulario a tu backend preferido:
- Google Forms
- Formspree
- EmailJS
- Tu propio API

## 📈 Optimización

### Performance
- ✅ Imágenes optimizadas (usa WebP cuando sea posible)
- ✅ Lazy loading implementado
- ✅ CSS y JS minificados en producción
- ✅ CDN para Tailwind CSS

### SEO
- ✅ Meta tags optimizados
- ✅ Estructura semántica HTML5
- ✅ Open Graph tags (agregar si necesitas)
- ✅ Schema markup (considerar agregar)

## 🚢 Despliegue

### GitHub Pages
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main como fuente
4. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

### Netlify
1. Arrastra la carpeta a [Netlify Drop](https://app.netlify.com/drop)
2. ¡Listo! Tu sitio está en línea

### Vercel
```bash
npm i -g vercel
vercel
```

## 📝 Checklist Pre-Lanzamiento

- [ ] Actualizar todos los textos placeholder
- [ ] Agregar precios reales
- [ ] Cambiar información de contacto
- [ ] Reemplazar imágenes SVG con fotos reales
- [ ] Actualizar meta tags SEO
- [ ] Configurar Google Analytics (opcional)
- [ ] Probar en múltiples dispositivos
- [ ] Verificar todos los enlaces
- [ ] Optimizar imágenes
- [ ] Probar formulario de contacto

## 🤝 Contribuciones

¿Tienes ideas para mejorar esta plantilla? ¡Las contribuciones son bienvenidas!

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 💬 Soporte

¿Necesitas ayuda? 
- 📧 Email: info@webpro.com
- 💬 WhatsApp: +54 9 11 1234-5678

---

Hecho con ❤️ para ayudarte a vender tus servicios web

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2025
