/**
 * Script principal para a página web "IA e Simulações Interativas no Ensino de Circuitos Elétricos"
 * Responsável pela interatividade, chatbot e integração com simulações PHET
 * Versão: ChatGPT OpenAI Integrado
 */

// Espera o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Elementos do DOM =====
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const minimizeChat = document.getElementById('minimize-chat');
    const chatbotBody = document.getElementById('chatbot-body');
    const openChatMobile = document.getElementById('open-chat-mobile');
    const circuitType = document.getElementById('circuit-type');
    const phetIframe = document.getElementById('phet-iframe');
    const instructionList = document.getElementById('instruction-list');
    const raButton = document.querySelector('a[href="#recursos-ra"]');
    
    // Botões para carregar simulações específicas
    const loadSerieBtn = document.getElementById('load-serie-simulation');
    const loadParaleloBtn = document.getElementById('load-paralelo-simulation');
    const loadMistoBtn = document.getElementById('load-misto-simulation');
    
    // ===== Configurações =====
    // URLs base para as simulações PHET
    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html';
    
    // Parâmetros para diferentes tipos de circuitos
    const circuitParams = {
        serie: '?locale=pt',
        paralelo: '?locale=pt',
        misto: '?locale=pt'
    };
    
    // URL da API do backend (ajuste conforme necessário)
    const API_BASE_URL = window.CHATBOT_API_URL || 'http://localhost:5000';
    
    // ===== Funções do Chatbot =====
    
    // Função para processar a entrada do usuário e gerar resposta via OpenAI
    async function processUserInput(message) {
        try {
            // Mostra indicador de carregamento
            addMessage('bot', 'Pensando...', true);
            
            // Faz a requisição para a API do backend
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            // Remove o indicador de carregamento
            removeLoadingMessage();
            
            if (response.ok) {
                const data = await response.json();
                addMessage('bot', data.response);
            } else {
                const errorData = await response.json();
                let errorMessage = 'Não foi possível processar sua mensagem.';
                
                if (response.status === 429) {
                    errorMessage = 'Limite de uso da API excedido. Tente novamente em alguns minutos.';
                } else if (response.status === 401) {
                    errorMessage = 'Erro de autenticação. Verifique se a chave da API está configurada corretamente.';
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                }
                
                addMessage('bot', `❌ ${errorMessage}`);
            }
            
        } catch (error) {
            // Remove o indicador de carregamento
            removeLoadingMessage();
            
            // Verifica se é erro de conexão
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                addMessage('bot', '🔌 Não foi possível conectar ao servidor do chatbot. Verifique se o backend está rodando ou se a URL da API está correta.');
            } else {
                addMessage('bot', '⚠️ Ocorreu um erro inesperado. Tente novamente mais tarde.');
            }
            
            console.error('Erro ao conectar com a API:', error);
        }
    }
    
    // Função para adicionar mensagem ao chat
    function addMessage(sender, message, isLoading = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message${isLoading ? ' loading' : ''}`;
        
        if (isLoading) {
            messageDiv.innerHTML = `
                <div class="loading-indicator">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <span>${message}</span>
            `;
        } else {
            messageDiv.textContent = message;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Função para remover mensagem de carregamento
    function removeLoadingMessage() {
        const loadingMessage = chatMessages.querySelector('.loading');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }
    
    // Função para enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Adiciona mensagem do usuário
            addMessage('user', message);
            
            // Limpa o campo de entrada
            chatInput.value = '';
            
            // Processa a entrada e gera resposta
            processUserInput(message);
        }
    }
    
    // ===== Event Listeners =====
    
    // Enviar mensagem ao clicar no botão
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }
    
    // Enviar mensagem ao pressionar Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Minimizar/maximizar chatbot
    if (minimizeChat) {
        minimizeChat.addEventListener('click', function() {
            if (chatbotBody) {
                chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
                minimizeChat.textContent = chatbotBody.style.display === 'none' ? '▲' : '▼';
            }
        });
    }
    
    // Abrir chat no mobile
    if (openChatMobile) {
        openChatMobile.addEventListener('click', function() {
            const chatbot = document.getElementById('chatbot');
            if (chatbot) {
                chatbot.style.display = 'block';
            }
        });
    }
    
    // ===== Funcionalidades das Simulações =====
    
    // Função para carregar simulação específica
    function loadSimulation(type) {
        if (phetIframe && circuitParams[type]) {
            const url = phetBaseUrl + circuitParams[type];
            phetIframe.src = url;
            
            // Atualiza as instruções baseadas no tipo de circuito
            updateInstructions(type);
        }
    }
    
    // Função para atualizar instruções
    function updateInstructions(type) {
        if (!instructionList) return;
        
        const instructions = {
            serie: [
                "Arraste uma fonte de tensão CA para a área de trabalho",
                "Adicione resistores conectando-os um após o outro",
                "Use o voltímetro para medir a tensão em cada resistor",
                "Use o amperímetro para verificar que a corrente é a mesma em todos os pontos",
                "Observe como a tensão se divide entre os resistores"
            ],
            paralelo: [
                "Arraste uma fonte de tensão CA para a área de trabalho",
                "Adicione resistores conectando-os em ramificações separadas",
                "Use o voltímetro para verificar que a tensão é a mesma em todos os resistores",
                "Use o amperímetro para medir a corrente em cada ramo",
                "Observe como a corrente se divide entre os resistores"
            ],
            misto: [
                "Arraste uma fonte de tensão CA para a área de trabalho",
                "Crie uma combinação de resistores em série e paralelo",
                "Identifique as partes em série e as partes em paralelo",
                "Use voltímetros e amperímetros para medir tensões e correntes",
                "Compare os resultados com os cálculos teóricos"
            ]
        };
        
        instructionList.innerHTML = '';
        if (instructions[type]) {
            instructions[type].forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                instructionList.appendChild(li);
            });
        }
    }
    
    // Event listeners para os botões de simulação
    if (loadSerieBtn) {
        loadSerieBtn.addEventListener('click', () => loadSimulation('serie'));
    }
    
    if (loadParaleloBtn) {
        loadParaleloBtn.addEventListener('click', () => loadSimulation('paralelo'));
    }
    
    if (loadMistoBtn) {
        loadMistoBtn.addEventListener('click', () => loadSimulation('misto'));
    }
    
    // Mudança no seletor de tipo de circuito
    if (circuitType) {
        circuitType.addEventListener('change', function() {
            const selectedType = this.value;
            if (selectedType && selectedType !== 'default') {
                loadSimulation(selectedType);
            }
        });
    }
    
    // ===== Funcionalidades de Realidade Aumentada =====
    
    // Placeholder para funcionalidades de RA
    if (raButton) {
        raButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidade de Realidade Aumentada em desenvolvimento. Em breve, você poderá visualizar circuitos em 3D usando seu smartphone!');
        });
    }
    
    // ===== Inicialização =====
    
    // Mensagem de boas-vindas do chatbot
    setTimeout(() => {
        addMessage('bot', '🤖 Olá! Sou o CircuitosEdu Assistente, conectado ao ChatGPT da OpenAI. Estou especializado em circuitos de corrente alternada (CA), motores trifásicos, transformadores e automação industrial. Como posso ajudar você hoje?');
    }, 1000);
    
    // Carrega simulação padrão (série)
    loadSimulation('serie');
    
    // ===== Funções Auxiliares =====
    
    // Função para verificar se a API está disponível
    async function checkAPIHealth() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            if (response.ok) {
                console.log('API do chatbot está funcionando!');
                return true;
            }
        } catch (error) {
            console.warn('API do chatbot não está disponível:', error);
            return false;
        }
    }
    
    // Verifica a saúde da API na inicialização
    checkAPIHealth();
    
    // ===== Responsividade =====
    
    // Ajusta o chatbot para dispositivos móveis
    function adjustForMobile() {
        const chatbot = document.getElementById('chatbot');
        if (window.innerWidth <= 768 && chatbot) {
            chatbot.style.position = 'fixed';
            chatbot.style.bottom = '10px';
            chatbot.style.right = '10px';
            chatbot.style.width = '90%';
            chatbot.style.maxWidth = '350px';
        }
    }
    
    // Ajusta na inicialização e quando a janela é redimensionada
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
    
    // ===== Acessibilidade =====
    
    // Adiciona suporte a navegação por teclado
    document.querySelectorAll('button, a, input, select').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    console.log('CircuitosEdu - ChatGPT OpenAI Integrado carregado com sucesso!');
});

