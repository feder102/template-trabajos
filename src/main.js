// Importar estilos
import './styles.css'

// Importar chatbot
import { chatbot } from './chatbot.js'

// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Resaltar enlace activo en navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-link-active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav-link-active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // Animaciones al hacer scroll
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

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.package-card, .stat-number');
    animatedElements.forEach(el => observer.observe(el));

    // Inicializar chatbot
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
        // En producción: usar API endpoint
        console.log('🚀 Chatbot iniciado en modo producción');
        chatbot.init('production-mode');
    } else {
        // En desarrollo: usar variable de entorno de Vite
        const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
        
        if (!GROQ_API_KEY) {
            console.warn('⚠️ CHATBOT: Configura VITE_GROQ_API_KEY en tu archivo .env.local');
            console.warn('📝 Obtén tu API Key GRATIS en: https://console.groq.com/keys');
            console.warn('🎁 Límites generosos: 30 req/min, 14,400 req/día - GRATIS!');
        } else {
            chatbot.init(GROQ_API_KEY);
        }
    }
});
