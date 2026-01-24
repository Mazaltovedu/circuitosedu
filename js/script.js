document.addEventListener('DOMContentLoaded', function() {
    
    // URL Kappa operacional confirmada por você
    const API_BASE_URL = 'https://circuitosedu-kappa.vercel.app'; 

    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Adiciona mensagem do usuário
        addMessage('user', message);
        chatInput.value = '';
        
        // Adiciona indicador de "Pensando..." com ID único para fácil remoção
        addMessage('bot', '<em>O tutor está analisando...</em>', true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            // Remove especificamente a mensagem de carregamento
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();

            if (response.ok) {
                const data = await response.json();
                // 'data.reply' é o campo que você configurou no seu index.py
                addMessage('bot', data.reply); 
            } else {
                addMessage('bot', '🔌 Erro: O servidor não conseguiu processar a dúvida.');
            }
        } catch (error) {
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();
            addMessage('bot', '🔌 Erro de conexão: Verifique se o backend na Vercel está ativo.');
            console.error('Erro na API:', error);
        }
    }

    function addMessage(sender, text, isLoading = false) {
        const div = document.createElement('div');
        // Usa as classes que você definiu no seu index.html anterior
        div.className = `message ${sender}-message`; 
        
        if (isLoading) {
            div.id = 'temp-loading';
            div.classList.add('loading');
        }

        div.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(div);
        
        // Garante que o scroll sempre acompanhe a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event Listeners
    if (sendMessageBtn) sendMessageBtn.addEventListener('click', sendMessage);
    
    // Enviar ao apertar Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
