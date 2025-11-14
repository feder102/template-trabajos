// Cargador de variables de entorno para el navegador
// Este script lee el archivo .env y expone las variables

class EnvLoader {
    constructor() {
        this.env = {};
    }

    async load() {
        try {
            const response = await fetch('./.env');
            if (!response.ok) {
                throw new Error('Archivo .env no encontrado');
            }
            
            const text = await response.text();
            this.parse(text);
            return this.env;
        } catch (error) {
            console.error('Error cargando .env:', error);
            return {};
        }
    }

    parse(text) {
        const lines = text.split('\n');
        
        for (const line of lines) {
            // Ignorar líneas vacías y comentarios
            if (!line.trim() || line.trim().startsWith('#')) {
                continue;
            }
            
            // Parsear línea KEY=VALUE
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                const value = valueParts.join('=').trim();
                this.env[key.trim()] = value;
            }
        }
    }

    get(key) {
        return this.env[key];
    }
}

// Instancia global
const envLoader = new EnvLoader();
