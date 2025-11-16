// Chatbot con Groq AI (Llama 3.3 - GRATIS y Rápido)
export class GroqChatbot {
    constructor() {
        this.apiKey = '';
        this.messages = [];
        this.isOpen = false;
        this.isInitialized = false;
        this.contextInfo = '';
    }

    async loadContext() {
        try {
            const response = await fetch('./chatbot-info.md');
            this.contextInfo = await response.text();
        } catch (error) {
            console.error('Error loading context:', error);
            this.contextInfo = 'Información no disponible';
        }
    }

    init(apiKey) {
        if (!apiKey) {
            console.error('API Key de Groq no configurada');
            return;
        }
        this.apiKey = apiKey;
        this.isInitialized = true;
        this.loadContext();
        this.createChatUI();
        this.attachEventListeners();
    }

    createChatUI() {
        // Botón flotante
        const chatButton = document.createElement('button');
        chatButton.id = 'chatbot-button';
        chatButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
        `;
        chatButton.className = 'fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full shadow-2xl hover:shadow-primary-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 animate-bounce';
        
        // Ventana de chat
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chatbot-window';
        chatWindow.className = 'fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl hidden flex-col overflow-hidden z-50 border-2 border-primary-200';
        chatWindow.innerHTML = `
            <div class="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="font-bold">Asistente Virtual</div>
                        <div class="text-xs text-white/80">Powered by Groq AI ⚡</div>
                    </div>
                </div>
                <button id="chatbot-close" class="hover:bg-white/20 rounded-full p-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div id="chatbot-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                <div class="flex gap-2">
                    <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                        <p class="text-gray-800">👋 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>
                        <p class="text-sm text-gray-500 mt-2">Puedo responder preguntas sobre:</p>
                        <ul class="text-sm text-gray-600 mt-1 space-y-1">
                            <li>📦 Nuestros paquetes y precios</li>
                            <li>⏱️ Tiempos de entrega</li>
                            <li>💳 Formas de pago</li>
                            <li>🎨 Tecnologías que usamos</li>
                            <li>📞 Cómo contactarnos</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-white border-t border-gray-200">
                <div class="flex gap-2">
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        placeholder="Escribe tu mensaje..." 
                        class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button 
                        id="chatbot-send" 
                        class="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-accent-700 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                    </button>
                </div>
                <p class="text-xs text-gray-500 mt-2 text-center">Las respuestas son generadas por IA</p>
            </div>
        `;

        document.body.appendChild(chatButton);
        document.body.appendChild(chatWindow);
    }

    attachEventListeners() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        button.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.remove('hidden');
            window.classList.add('flex');
            button.classList.remove('animate-bounce');
        } else {
            window.classList.add('hidden');
            window.classList.remove('flex');
            button.classList.add('animate-bounce');
        }
    }

    addMessage(text, isUser = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex gap-2' + (isUser ? ' justify-end' : '');
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-[80%]">
                    <p>${this.escapeHtml(text)}</p>
                </div>
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </div>
                <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                    <p class="text-gray-800 whitespace-pre-wrap">${this.formatMessage(text)}</p>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex gap-2';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <div class="flex gap-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const message = input.value.trim();

        if (!message || !this.isInitialized) return;

        // Deshabilitar input
        input.disabled = true;
        sendBtn.disabled = true;

        // Agregar mensaje del usuario
        this.addMessage(message, true);
        this.messages.push({ role: 'user', content: message });
        input.value = '';

        // Mostrar indicador de escritura
        this.addTypingIndicator();

        try {
            const response = await this.callGroqAPI(message);
            this.removeTypingIndicator();
            this.addMessage(response);
            this.messages.push({ role: 'assistant', content: response });
        } catch (error) {
            this.removeTypingIndicator();
            console.error('❌ Error del chatbot:', error);
            
            // Mensaje amigable SIN detalles técnicos
            const userMessage = '🤖 Ey, me quedé sin palabras por un rato... ¡Pero tranqui! Hablá directamente con Guillermo, él te va a atender al toque 👇';
            this.addMessage(userMessage);
            
            // Solo para debugging en consola (no se muestra al usuario)
            if (error.message === 'UNAUTHORIZED') {
                console.warn('⚠️ DEV: Configura VITE_GROQ_API_KEY en .env.local');
            } else if (error.message === 'RATE_LIMIT') {
                console.warn('⏳ DEV: Límite de API alcanzado');
            } else if (error.message === 'API_ERROR') {
                console.warn('❌ DEV: Error de API');
            }
            
            // Agregar botón de WhatsApp
            const messagesContainer = document.getElementById('chatbot-messages');
            const whatsappBtn = document.createElement('div');
            whatsappBtn.className = 'flex gap-2 justify-center mt-3';
            whatsappBtn.innerHTML = `
                <a href="https://wa.me/5492645317435?text=Hola%20Fede!%20Vengo%20desde%20el%20chatbot%20de%20la%20web%20y%20necesito%20info%20sobre%20sus%20servicios%20🚀" 
                   target="_blank" 
                   rel="noopener"
                   class="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Hablar con Fede
                </a>
            `;
            messagesContainer.appendChild(whatsappBtn);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Rehabilitar input
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }

    async callGroqAPI(userMessage, retryCount = 0) {
        const maxRetries = 2;

        try {
            const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
            
            let response;
            
            if (isProduction) {
                // En producción: usar API endpoint de Vercel
                response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        contextInfo: this.contextInfo
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('❌ Error del API endpoint:', errorData);
                    
                    if (response.status === 429) {
                        if (retryCount < maxRetries) {
                            const waitTime = (retryCount + 1) * 5000;
                            console.log(`⏳ Límite alcanzado. Esperando ${waitTime/1000}s antes de reintentar... (Intento ${retryCount + 1}/${maxRetries})`);
                            await new Promise(resolve => setTimeout(resolve, waitTime));
                            return this.callGroqAPI(userMessage, retryCount + 1);
                        }
                        throw new Error('Límite de solicitudes alcanzado (429)');
                    }
                    throw new Error(`Error ${response.status} en la API`);
                }

                const data = await response.json();
                return data.response;
                
            } else {
                // En desarrollo: llamada directa a Groq (GRATIS y RÁPIDO)
                const systemPrompt = `Eres un asistente virtual profesional para WebPro, una empresa de desarrollo web en San Juan, Argentina. 

Tu misión es ayudar a los visitantes del sitio web respondiendo sus preguntas de manera amigable, profesional y concisa.

INFORMACIÓN DE LA EMPRESA:
${this.contextInfo}

INSTRUCCIONES IMPORTANTES:
1. Responde SIEMPRE en español
2. Sé amigable, profesional y conciso
3. Usa emojis ocasionalmente para dar calidez (pero no abuses)
4. Si te preguntan algo que NO está en la información, sé honesto y sugiere contactar directamente
5. SIEMPRE incluye una forma de contacto (WhatsApp, email) en respuestas sobre presupuestos o información detallada
6. Si te preguntan sobre precios, menciona los paquetes disponibles
7. Para consultas técnicas complejas, sugiere agendar una consulta gratuita
8. Mantén las respuestas entre 2-4 párrafos (salvo que la pregunta requiera más detalle)
9. Si te preguntan por algo fuera del contexto de la empresa (clima, política, etc), redirige amablemente al tema de desarrollo web

CONTACTO PRINCIPAL:
- WhatsApp: +54 9 264 531-7435
- Email: tresrabas@gmail.com

Responde la siguiente pregunta del usuario:`;

                response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'llama-3.3-70b-versatile', // Modelo actualizado y más potente
                        messages: [
                            {
                                role: 'system',
                                content: systemPrompt
                            },
                            {
                                role: 'user',
                                content: userMessage
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 800,
                        top_p: 0.9
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('❌ Error de la API de Groq:', errorData);
                    
                    if (response.status === 401) {
                        throw new Error('UNAUTHORIZED');
                    } else if (response.status === 429) {
                        if (retryCount < maxRetries) {
                            const waitTime = (retryCount + 1) * 3000;
                            console.log(`⏳ Límite alcanzado. Esperando ${waitTime/1000}s... (Intento ${retryCount + 1}/${maxRetries})`);
                            await new Promise(resolve => setTimeout(resolve, waitTime));
                            return this.callGroqAPI(userMessage, retryCount + 1);
                        }
                        throw new Error('RATE_LIMIT');
                    }
                    throw new Error('API_ERROR');
                }

                const data = await response.json();
                
                if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                    console.error('❌ Respuesta inválida de Groq:', data);
                    throw new Error('Respuesta inválida de la API');
                }
                
                return data.choices[0].message.content;
            }
        } catch (error) {
            console.error('❌ Error en callGroqAPI:', error);
            throw error;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatMessage(text) {
        // Convertir URLs en links
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-primary-600 hover:underline">$1</a>');
        
        // Convertir números de WhatsApp en links
        text = text.replace(/(\+?\d{1,3}[\s-]?\d{1,4}[\s-]?\d{3,4}[\s-]?\d{3,4})/g, '<a href="https://wa.me/$1" target="_blank" class="text-green-600 hover:underline">$1</a>');
        
        // Convertir emails en links
        text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, '<a href="mailto:$1" class="text-primary-600 hover:underline">$1</a>');
        
        // Convertir **texto** en negrita
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Convertir listas con - en <ul>
        text = text.replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>');
        
        return text;
    }
}

// Instancia global del chatbot
export const chatbot = new GroqChatbot();
