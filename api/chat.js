// API endpoint para proteger la API Key de Groq
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, contextInfo } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemPrompt = `Eres un asistente virtual profesional para WebPro, una empresa de desarrollo web en San Juan, Argentina. 

Tu misión es ayudar a los visitantes del sitio web respondiendo sus preguntas de manera amigable, profesional y concisa.

INFORMACIÓN DE LA EMPRESA:
${contextInfo || 'Información no disponible'}

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

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Groq API error:', error);
      return res.status(response.status).json({ error: error.error || 'API error' });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(500).json({ error: 'Invalid API response' });
    }

    return res.status(200).json({
      response: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
