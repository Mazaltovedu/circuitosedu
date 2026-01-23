// URL da API corrigida para produção na Vercel
const API_BASE_URL = 'https://circuitosedu.vercel.app/api';

async function processUserInput(message) {
    try {
        addMessage('bot', 'O tutor está analisando o circuito...', true);
        
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        removeLoadingMessage();
        
        if (response.ok) {
            const data = await response.json();
            // Ajustado para 'reply' conforme seu chat.py do Gemini
            addMessage('bot', data.reply); 
        } else {
            addMessage('bot', '❌ Erro ao processar a resposta. Verifique a API na Vercel.');
        }
    } catch (error) {
        removeLoadingMessage();
        addMessage('bot', '🔌 Erro de conexão: O servidor da Vercel não respondeu.');
        console.error('Erro:', error);
    }
}
