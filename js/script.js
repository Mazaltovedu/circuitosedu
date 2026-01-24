/**
 * Script Principal - CircuitosEdu (Versão Gemini Integrada)
 * Localização: Manaus-AM - Pesquisa de Mestrado
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÕES =====
    // ATENÇÃO: Link atualizado para o ambiente "kappa" operacional
    const API_BASE_URL = 'https://circuitosedu-kappa.vercel.app'; 
    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html';

    // ===== ELEMENTOS DO DOM =====
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const phetIframe = document.getElementById('phet-iframe');
    const circuitType = document.getElementById('circuit-type');

    // ===== 1. FUNÇÃO DE LOGS (Essencial para a tese) =====
    async function logPedagogico(evento, topico, detalhe) {
        try {
            // Removido o '/api' pois o seu link kappa já responde na raiz
            await fetch(`${API_BASE_URL}/logs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    estudanteId: localStorage.getItem('circuitosedu_user_id') || 'anonimo',
                    timestamp: new Date().toISOString(),
                    evento: evento,
                    topico: topico,
                    detalhes: detalhe
                })
            });
        } catch (e) { 
            console.warn("Log off-line:", e); 
        }
    }

    // ===== 2. LÓGICA DO CHATBOT =====
    function addMessage(sender, text, isLoading = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message${isLoading ? ' loading' : ''}`;
        
        if (isLoading) {
            messageDiv.innerHTML = `<div class="message-content"><em>O tutor está analisando o circuito...</em></div>`;
            messageDiv.id = "temp-loading";
        } else {
            messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        chatInput.value = '';
        
        // Registra a pergunta no log pedagógico
        logPedagogico('consulta_IA', 'Chat_CA', { pergunta: message });

        addMessage('bot', '', true);

        try {
            // Removido o '/api' para alinhar com o retorno do seu link kappa
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();

            if (response.ok) {
                const data = await response.json();
                // 'data.reply' é o campo que você configurou no chat.py
                addMessage('bot', data.reply); 
            } else {
                throw new Error();
            }
        } catch (error) {
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();
            addMessage('bot', '🔌 Erro de conexão com o servidor da Vercel.');
        }
    }

    // ===== 3. EVENT LISTENERS =====
    if (sendMessageBtn) sendMessageBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    window.onload = () => {
        logPedagogico('inicio_sessao', 'Acesso_Plataforma', { origem: 'Navegador' });
    };
});
