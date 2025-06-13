/**
 * Script principal para a página web "IA e Simulações Interativas no Ensino de Circuitos Elétricos"
 * Responsável pela interatividade, chatbot e integração com simulações PHET
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
    
    // Botões para carregar simulações específicas
    const loadSerieBtn = document.getElementById('load-serie-simulation');
    const loadParaleloBtn = document.getElementById('load-paralelo-simulation');
    const loadMistoBtn = document.getElementById('load-misto-simulation');
    
    // ===== Configurações =====
    // URLs base para as simulações PHET
    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac-virtual-lab/latest/circuit-construction-kit-ac-virtual-lab_pt_BR.html';
    
    // Parâmetros para diferentes tipos de circuitos
    const circuitParams = {
        serie: '?screens=1&circuit=series',
        paralelo: '?screens=1&circuit=parallel',
        misto: '?screens=1&circuit=mixed'
    };
    
    // Base de conhecimento para o chatbot
    const knowledgeBase = {
        // Perguntas gerais
        'ola': 'Olá! Como posso ajudar você com circuitos elétricos hoje?',
        'oi': 'Olá! Como posso ajudar você com circuitos elétricos hoje?',
        'ajuda': 'Posso ajudar com dúvidas sobre circuitos em série, paralelo ou mistos. O que você gostaria de saber?',
        
        // Circuitos em série (CA e CC)
        'serie': 'Em um circuito em série, os componentes são conectados sequencialmente. A corrente é a mesma em todos os componentes, e a tensão total é a soma das tensões em cada componente. Em CA, a impedância total é a soma das impedâncias individuais.',
        'circuito serie': 'Em um circuito em série, os componentes são conectados sequencialmente. A corrente é a mesma em todos os componentes, e a tensão total é a soma das tensões em cada componente. Em CA, a impedância total é a soma das impedâncias individuais.',
        'resistencia serie': 'Em um circuito em série, a resistência total é a soma das resistências individuais: Rtotal = R1 + R2 + ... + Rn. Em CA, considere a impedância.',
        'corrente serie': 'Em um circuito em série, a corrente é a mesma em todos os componentes: I = I1 = I2 = ... = In',
        'tensao serie': 'Em um circuito em série, a tensão total é a soma das tensões em cada componente: Vtotal = V1 + V2 + ... + Vn',
        
        // Circuitos em paralelo (CA e CC)
        'paralelo': 'Em um circuito em paralelo, os componentes são conectados em ramificações separadas, oferecendo múltiplos caminhos para a corrente. A tensão é a mesma em todos os componentes, e a corrente total é a soma das correntes em cada ramo. Em CA, o inverso da impedância total é a soma dos inversos das impedâncias individuais.',
        'circuito paralelo': 'Em um circuito em paralelo, os componentes são conectados em ramificações separadas, oferecendo múltiplos caminhos para a corrente. A tensão é a mesma em todos os componentes, e a corrente total é a soma das correntes em cada ramo. Em CA, o inverso da impedância total é a soma dos inversos das impedâncias individuais.',
        'resistencia paralelo': 'Em um circuito em paralelo, o inverso da resistência total é a soma dos inversos das resistências individuais: 1/Rtotal = 1/R1 + 1/R2 + ... + 1/Rn. Em CA, considere a impedância.',
        'corrente paralelo': 'Em um circuito em paralelo, a corrente total é a soma das correntes em cada ramo: Itotal = I1 + I2 + ... + In',
        'tensao paralelo': 'Em um circuito em paralelo, a tensão é a mesma em todos os componentes: V = V1 = V2 = ... = Vn',
        
        // Circuitos mistos (CA e CC)
        'misto': 'Circuitos mistos combinam elementos em série e em paralelo. Para analisá-los, identifique as partes em série e em paralelo, aplique as regras específicas para cada parte e combine os resultados. Em CA, utilize impedâncias para a análise.',
        'circuito misto': 'Circuitos mistos combinam elementos em série e em paralelo. Para analisá-los, identifique as partes em série e em paralelo, aplique as regras específicas para cada parte e combine os resultados. Em CA, utilize impedâncias para a análise.',
        'analisar misto': 'Para analisar um circuito misto: 1) Identifique as partes em série e em paralelo, 2) Calcule as resistências/impedâncias equivalentes para cada parte, 3) Simplifique o circuito progressivamente, 4) Determine as grandezas elétricas em cada componente.',
        
        // Lei de Ohm (CA e CC)
        'lei de ohm': 'A Lei de Ohm estabelece que a corrente que passa por um condutor é diretamente proporcional à tensão e inversamente proporcional à resistência (em CC) ou impedância (em CA): I = V/R ou I = V/Z.',
        'ohm': 'A Lei de Ohm estabelece que a corrente que passa por um condutor é diretamente proporcional à tensão e inversamente proporcional à resistência (em CC) ou impedância (em CA): I = V/R ou I = V/Z.',
        
        // Componentes (CA e CC)
        'resistor': 'O resistor é um componente que limita o fluxo de corrente elétrica em um circuito. Sua unidade de medida é o Ohm (Ω). Em CA, sua impedância é igual à sua resistência.',
        'capacitor': 'O capacitor é um componente que armazena energia em um campo elétrico. Sua unidade de medida é o Farad (F). Em CA, ele apresenta reatância capacitiva (Xc), que se opõe à variação de tensão.',
        'indutor': 'O indutor é um componente que armazena energia em um campo magnético. Sua unidade de medida é o Henry (H). Em CA, ele apresenta reatância indutiva (Xl), que se opõe à variação de corrente.',
        
        // Conceitos de CA
        'corrente alternada': 'Corrente Alternada (CA) é um tipo de corrente elétrica que inverte periodicamente seu sentido, variando sua magnitude ao longo do tempo, geralmente de forma senoidal.',
        'tensao alternada': 'Tensão Alternada (CA) é um tipo de tensão elétrica que inverte periodicamente sua polaridade, variando sua magnitude ao longo do tempo, geralmente de forma senoidal.',
        'impedancia': 'Impedância (Z) é a oposição total que um circuito oferece à passagem de corrente alternada. É uma grandeza complexa que combina resistência e reatância, e sua unidade é o Ohm (Ω).',
        'reatancia': 'Reatância é a oposição à corrente alternada causada por capacitores (reatância capacitiva, Xc) e indutores (reatância indutiva, Xl). É medida em Ohms (Ω).',
        'frequencia': 'Frequência é o número de ciclos completos que uma onda de corrente ou tensão alternada realiza em um segundo. Sua unidade é o Hertz (Hz).',
        'fasor': 'Fasor é uma representação gráfica de uma grandeza senoidal (como tensão ou corrente alternada) que permite simplificar a análise de circuitos CA, transformando equações diferenciais em equações algébricas complexas.',
        
        // Instrumentos de medição
        'multimetro': 'O multímetro é um instrumento que pode medir tensão, corrente e resistência. Na simulação, você pode usá-lo para verificar os valores em diferentes pontos do circuito.',
        'amperimetro': 'O amperímetro é um instrumento usado para medir a corrente elétrica. Deve ser conectado em série com o componente que se deseja medir.',
        'voltimetro': 'O voltímetro é um instrumento usado para medir a tensão elétrica. Deve ser conectado em paralelo com o componente que se deseja medir.',
        
        // Erros comuns
        'curto circuito': 'Um curto-circuito ocorre quando há um caminho de baixa resistência entre dois pontos de um circuito, causando um fluxo excessivo de corrente. Isso pode danificar componentes ou causar acidentes.',
        'circuito aberto': 'Um circuito aberto ocorre quando há uma interrupção no caminho da corrente elétrica, impedindo seu fluxo. Isso pode ser causado por um componente queimado ou uma conexão solta.',
        
        // Fallback
        'default': 'Desculpe, não tenho informações específicas sobre isso. Posso ajudar com dúvidas sobre circuitos em série, paralelo, mistos, Lei de Ohm, componentes elétricos (resistor, capacitor, indutor) ou conceitos de CA como impedância, reatância, frequência e fasores.'
    };
    
    // ===== Funções do Chatbot =====
    
    // Função para adicionar mensagem ao chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Rola para a mensagem mais recente
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    // Função para processar a entrada do usuário e gerar resposta
    function processUserInput(input) {
        // Converte para minúsculas e remove acentos para facilitar a correspondência
        const normalizedInput = input.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        
        // Procura por palavras-chave na base de conhecimento
        let response = knowledgeBase.default;
        
        // Verifica se há correspondência exata
        if (knowledgeBase[normalizedInput]) {
            response = knowledgeBase[normalizedInput];
        } else {
            // Procura por correspondência parcial
            for (const key in knowledgeBase) {
                if (normalizedInput.includes(key)) {
                    response = knowledgeBase[key];
                    break;
                }
            }
        }
        
        // Adiciona a resposta ao chat
        addMessage(response);
    }
    
    // Função para enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            // Adiciona a mensagem do usuário ao chat
            addMessage(message, true);
            
            // Processa a entrada e gera resposta
            setTimeout(() => {
                processUserInput(message);
            }, 500);
            
            // Limpa o campo de entrada
            chatInput.value = '';
        }
    }
    
    // ===== Funções para Simulações =====
    
    // Função para carregar simulação específica
    function loadSimulation(type) {
        const url = phetBaseUrl + (circuitParams[type] || '');
        phetIframe.src = url;
        
        // Atualiza o seletor de circuito
        circuitType.value = type;
        
        // Atualiza as instruções
        updateInstructions(type);
    }
    
    // Função para atualizar instruções baseado no tipo de circuito
    function updateInstructions(type) {
        let instructions = [];
        
        switch(type) {
            case 'serie':
                instructions = [
                    'Arraste uma fonte de tensão CA para a área de trabalho',
                    'Adicione resistores, capacitores ou indutores em sequência',
                    'Conecte todos os componentes em um único caminho',
                    'Use o multímetro para medir a corrente e a tensão em diferentes pontos',
                    'Observe a defasagem entre tensão e corrente em capacitores e indutores'
                ];
                break;
                
            case 'paralelo':
                instructions = [
                    'Arraste uma fonte de tensão CA para a área de trabalho',
                    'Crie múltiplos caminhos entre os terminais da fonte',
                    'Adicione resistores, capacitores ou indutores em cada caminho',
                    'Use o multímetro para medir a tensão em cada componente (deve ser igual)',
                    'Verifique a corrente em cada ramo e a corrente total'
                ];
                break;
                
            case 'misto':
                instructions = [
                    'Arraste uma fonte de tensão CA para a área de trabalho',
                    'Crie uma combinação de conexões em série e paralelo',
                    'Identifique as partes em série e em paralelo do circuito',
                    'Use o multímetro para analisar tensão e corrente em diferentes pontos',
                    'Compare os valores medidos com os valores calculados teoricamente, considerando impedâncias'
                ];
                break;
                
            default:
                instructions = [
                    'Arraste componentes da caixa de ferramentas para a área de trabalho',
                    'Conecte os componentes para formar um circuito',
                    'Use o multímetro para medir tensão e corrente',
                    'Experimente diferentes configurações e observe os resultados'
                ];
        }
        
        // Atualiza a lista de instruções
        instructionList.innerHTML = '';
        instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionList.appendChild(li);
        });
    }
    
    // ===== Event Listeners =====
    
    // Enviar mensagem ao clicar no botão
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Enviar mensagem ao pressionar Enter
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Minimizar/maximizar chatbot
    minimizeChat.addEventListener('click', function() {
        chatbotBody.classList.toggle('d-none');
        
        // Alterna o ícone
        const icon = minimizeChat.querySelector('i');
        if (icon.classList.contains('fa-minus')) {
            icon.classList.replace('fa-minus', 'fa-plus');
        } else {
            icon.classList.replace('fa-plus', 'fa-minus');
        }
    });
    
    // Abrir chatbot no mobile
    if (openChatMobile) {
        openChatMobile.addEventListener('click', function() {
            const chatbotContainer = document.querySelector('.chatbot-container');
            chatbotContainer.classList.toggle('d-none');
            chatbotBody.classList.remove('d-none');
        });
    }
    
    // Mudar tipo de circuito
    circuitType.addEventListener('change', function() {
        loadSimulation(this.value);
    });
    
    // Botões para carregar simulações específicas
    if (loadSerieBtn) {
        loadSerieBtn.addEventListener('click', function() {
            loadSimulation('serie');
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('serieModal'));
            modal.hide();
        });
    }
    
    if (loadParaleloBtn) {
        loadParaleloBtn.addEventListener('click', function() {
            loadSimulation('paralelo');
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('paraleloModal'));
            modal.hide();
        });
    }
    
    if (loadMistoBtn) {
        loadMistoBtn.addEventListener('click', function() {
            loadSimulation('misto');
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('mistoModal'));
            modal.hide();
        });
    }
    
    // ===== Inicialização =====
    
    // Mensagem de boas-vindas do chatbot (já está no HTML)
    
    // Carrega a simulação padrão
    // Já está carregando pelo iframe no HTML
    
    // Configura as instruções iniciais
    updateInstructions('serie');
    
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para o navbar fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});

