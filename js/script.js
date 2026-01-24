/**
 * Script Principal - CircuitosEdu
 * Responsável pela interatividade, chatbot Gemini e logs de pesquisa pedagógica.
 * Versão Corrigida para Backend "Kappa" - Localização: Manaus-AM
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURAÇÕES GERAIS =====
    // URL que você confirmou estar operacional (Backend Vercel)
    const API_BASE_URL = 'https://circuitosedu-kappa.vercel.app'; 
    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html';

    // ===== ELEMENTOS DO DOM =====
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const phetIframe = document.getElementById('phet-iframe');
    const circuitType = document.getElementById('circuit-type');

    // ===== 1. FUNÇÃO DE LOGS PEDAGÓGICOS (Pesquisa de Mestrado) =====
    // Registra o comportamento do aluno para sua análise de dados
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
            console.warn("Log off-line (Servidor em standby):", e); 
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
        
        // Log: Essencial para sua pesquisa pedagógica
        logPedagogico('consulta_IA', 'Chat_CA', { pergunta: message });

        // Interface: Mostra indicador de carregamento
        addMessage('bot', '', true);

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { '
