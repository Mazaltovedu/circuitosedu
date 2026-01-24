document.addEventListener('DOMContentLoaded', function() {
    // URL Kappa operacional que você validou
    const API_BASE_URL = 'https://circuitosedu-kappa.vercel.app'; 

    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        chatInput.value = '';
        
        // Adiciona indicador visual de carregamento
        addMessage('bot', '<em>O tutor está analisando o circuito...</em>', true);

        try {
            // Chama a rota /api/chat que está dentro do seu index.py
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();

            if (response.ok) {
                const data = await response.json();
                // Exibe a resposta do Gemini (campo 'reply')
                addMessage('bot', data.reply); 
            } else {
                addMessage('bot', '❌ O servidor encontrou um problema. Verifique os logs na Vercel.');
            }
        } catch (error) {
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();
            addMessage('bot', '🔌 Erro de conexão. Certifique-se de que a API na Vercel está online.');
            console.error('Erro:', error);
        }
    }

    function addMessage(sender, text, isLoading = false) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;
        if (isLoading) div.id = 'temp-loading';
        div.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (sendMessageBtn) sendMessageBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    }
});
