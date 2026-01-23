/**
 * Script Principal - CircuitosEdu
 * Responsável pela interatividade, chatbot Gemini e logs de pesquisa pedagógica.
 * Localização: Manaus-AM
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÕES GERAIS =====
    const API_BASE_URL = 'https://circuitosedu.vercel.app/api'; 
    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html';

    // ===== ELEMENTOS DO DOM =====
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const phetIframe = document.getElementById('phet-iframe');
    const circuitType = document.getElementById('circuit-type');

    // ===== 1. FUNÇÃO DE LOGS PEDAGÓGICOS (Pesquisa de Mestrado) =====
    async function logPedagogico(evento, topico, detalhe) {
        try {
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
            console.warn("Log off-line (Servidor Vercel pode estar em standby):", e); 
        }
    }

    // ===== 2. LÓGICA DO CHATBOT (Integração Gemini) =====
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

        // Interface: Adiciona pergunta do usuário
        addMessage('user', message);
        chatInput.value = '';
        
        // Log: Registra a interação para a pesquisa
        logPedagogico('consulta_IA', 'Chat_CA', { pergunta: message });

        // Interface: Mostra indicador de carregamento
        addMessage('bot', '', true);

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            // Remove o indicador de carregamento
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();

            if (response.ok) {
                const data = await response.json();
                // 'data.reply' é o campo definido no seu chat.py do Gemini
                addMessage('bot', data.reply); 
            } else {
                throw new Error('Falha na resposta do servidor');
            }
        } catch (error) {
            const loadingMsg = document.getElementById('temp-loading');
            if (loadingMsg) loadingMsg.remove();
            addMessage('bot', '🔌 Erro de conexão: O tutor está temporariamente indisponível na Vercel.');
            console.error('Erro na API:', error);
        }
    }

    // ===== 3. INTEGRAÇÃO COM SIMULAÇÕES PHET =====
    function loadSimulation(type) {
        if (phetIframe) {
            phetIframe.src = `${phetBaseUrl}?locale=pt`;
            logPedagogico('troca_simulacao', 'PHET', { tipo: type });
        }
    }

    // ===== EVENT LISTENERS =====
    if (sendMessageBtn) sendMessageBtn.addEventListener('click', sendMessage);
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    if (circuitType) {
        circuitType.addEventListener('change', (e) => loadSimulation(e.target.value));
    }

    // Registro de início de sessão
    window.onload = () => {
        logPedagogico('inicio_sessao', 'Acesso_Plataforma', { origem: 'Plickers_Diagnostico' });
    };

    console.log('CircuitosEdu - Script Unificado (Gemini + Logs) carregado.');
});
