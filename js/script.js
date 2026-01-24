document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://circuitosedu-kappa.vercel.app'; 

    // Captura os elementos
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // VERIFICAÇÃO DE SEGURANÇA: Só prossegue se os elementos existirem
    if (!chatInput || !sendMessageBtn || !chatMessages) {
        console.error("Erro: Um ou mais elementos do chat (input, botão ou mensagens) não foram encontrados no HTML. Verifique os IDs!");
        return; 
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        chatInput.value = '';
        addMessage('bot', '<em>Analisando...</em>', true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();

            if (response.ok) {
                const data = await response.json();
                addMessage('bot', data.reply); 
            } else {
                addMessage('bot', '🔌 Erro no servidor da Vercel.');
            }
        } catch (error) {
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();
            addMessage('bot', '🔌 Erro de conexão.');
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

    // Só adiciona o evento se o botão existir (evita o erro que apareceu no console)
    sendMessageBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
