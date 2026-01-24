document.addEventListener('DOMContentLoaded', function() {
    
    // URL Kappa operacional
    const API_BASE_URL = 'https://circuitosedu-kappa.vercel.app'; 

    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        chatInput.value = '';
        
        // Indicador de carregamento
        addMessage('bot', '<em>O tutor está analisando...</em>', true);

        try {
            // Chamando a rota específica /api/chat definida no seu index.py
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const loadingMsg = document.querySelector('.loading');
            if (loadingMsg) loadingMsg.remove();

            if (response.ok) {
                const data = await response.json();
                addMessage('bot', data.reply); 
            } else {
                addMessage('bot', '🔌 Erro na resposta do tutor.');
            }
        } catch (error) {
            const loadingMsg = document.querySelector('.loading');
            if (loadingMsg) loadingMsg.remove();
            addMessage('bot', '🔌 Erro de conexão com o servidor.');
        }
    }

    function addMessage(sender, text, isLoading = false) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message ${isLoading ? 'loading' : ''}`;
        div.innerHTML = `<div class="content">${text}</div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (sendMessageBtn) sendMessageBtn.addEventListener('click', sendMessage);
});
