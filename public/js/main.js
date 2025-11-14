// =========================================
// MAIN JAVASCRIPT - WebPro Template
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initPackageCards();
    initCounters();
});

// =========================================
// NAVEGACIÓN Y MENÚ
// =========================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll spy - destacar link activo según sección visible
    function onScroll() {
        let current = 'inicio';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id') || 'inicio';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === '#' + current) {
                link.classList.add('nav-link-active');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(onScroll, 100));
    onScroll();
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu .nav-link');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    // Toggle menú móvil
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// =========================================
// SCROLL SUAVE Y ANIMACIONES
// =========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.package-card, .bg-white.p-6, .bg-gray-50.p-8');
    animatedElements.forEach(el => observer.observe(el));
}

// =========================================
// TARJETAS DE PAQUETES
// =========================================

function initPackageCards() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        // Efecto de brillo al pasar el mouse
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto de click/tap
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const ctaButton = this.querySelector('a[href="#contacto"]');
                if (ctaButton) {
                    ctaButton.click();
                }
            }
        });
    });
}

// =========================================
// CONTADORES ANIMADOS
// =========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    if (counters.length > 0) {
        observer.observe(counters[0].parentElement);
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const text = counter.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const hasDash = text.includes('-');
            
            let targetValue;
            if (hasDash) {
                // Para rangos como "3-15"
                const parts = text.split('-');
                targetValue = parseInt(parts[1]);
            } else {
                targetValue = parseInt(text.replace(/\D/g, ''));
            }
            
            if (isNaN(targetValue)) return;
            
            const duration = 2000;
            const steps = 50;
            const stepValue = targetValue / steps;
            const stepDuration = duration / steps;
            let currentValue = 0;
            
            const timer = setInterval(() => {
                currentValue += stepValue;
                
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(currentValue);
                
                if (hasDash) {
                    counter.textContent = `3-${displayValue}`;
                } else if (hasPercent) {
                    counter.textContent = displayValue + '%';
                } else if (hasPlus) {
                    counter.textContent = displayValue + '+';
                } else {
                    counter.textContent = displayValue;
                }
            }, stepDuration);
        });
    }
}

// =========================================
// UTILIDADES
// =========================================

// Throttle function para optimizar eventos de scroll
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Detectar si el usuario prefiere reducir movimiento
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Aplicar accesibilidad si se prefiere reducir movimiento
if (prefersReducedMotion()) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-.duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// =========================================
// FORMULARIO DE CONTACTO (Opcional)
// =========================================

function initContactForm() {
    const form = document.querySelector('#contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Datos del formulario:', data);
        
        // Ejemplo de respuesta exitosa
        showNotification('¡Mensaje enviado correctamente!', 'success');
        form.reset();
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =========================================
// PERFORMANCE MONITORING (Opcional)
// =========================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Tiempo de carga: ${pageLoadTime}ms`);
    });
}

// =========================================
// EXPORTAR FUNCIONES (si usas módulos)
// =========================================

// export { initNavigation, initSmoothScroll, showNotification };
