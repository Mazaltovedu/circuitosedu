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
    const raButton = document.querySelector('a[href="#recursos-ra"]');
    
    // Botões para carregar simulações específicas
    const loadSerieBtn = document.getElementById('load-serie-simulation');
    const loadParaleloBtn = document.getElementById('load-paralelo-simulation');
    const loadMistoBtn = document.getElementById('load-misto-simulation');
    
    // ===== Configurações =====
    // URLs base para as simulações PHET    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html';
    
    // Chave da API OpenAI (ATENÇÃO: Em um ambiente de produção, esta chave não deve ser exposta diretamente no frontend)
    const openaiApiKey = ""; // Removida por segurança. Por favor, use um backend para gerenciar chaves de API.
    // Base de conhecimento para o chatbot (será usada como fallback ou para respostas rápidas)
    const knowledgeBase = {
        // Perguntas gerais    'ola': 'Olá! Como posso ajudar você com circuitos elétricos de corrente alternada hoje?',
        'oi': 'Olá! Como posso ajudar você com circuitos elétricos de corrente alternada hoje?',
        'ajuda': 'Posso ajudar com dúvidas sobre circuitos CA em série, paralelo ou mistos. O que você gostaria de saber?',
        
        // Circuitos em série
        'serie': 'Em um circuito CA em série, os componentes são conectados sequencialmente. A corrente é a mesma em todos os componentes, mas a análise de tensão é mais complexa que em CC devido à impedância dos componentes.',
        'circuito serie': 'Em um circuito CA em série, os componentes são conectados sequencialmente. A corrente é a mesma em todos os componentes, mas a análise de tensão é mais complexa que em CC devido à impedância dos componentes.',
        'resistencia serie': 'Em um circuito CA em série, a impedância total é a soma das impedâncias individuais: Ztotal = Z1 + Z2 + ... + Zn. Lembre-se que a impedância considera resistência, capacitância e indutância.',
        'corrente serie': 'Em um circuito CA em série, a corrente é a mesma em todos os componentes: I = I1 = I2 = ... = In, mas varia senoidalmente com o tempo.',
        'tensao serie': 'Em um circuito CA em série, a tensão total é a soma fasorial das tensões em cada componente, considerando as diferenças de fase.',
        
        // Circuitos em paralelo
        'paralelo': 'Em um circuito CA em paralelo, os componentes são conectados em ramificações separadas. A tensão é a mesma em todos os componentes, mas a análise de corrente é mais complexa que em CC devido à impedância.',
        'circuito paralelo': 'Em um circuito CA em paralelo, os componentes são conectados em ramificações separadas. A tensão é a mesma em todos os componentes, mas a análise de corrente é mais complexa que em CC devido à impedância.',
        'impedancia paralelo': 'Em um circuito CA em paralelo, o inverso da impedância total é a soma dos inversos das impedâncias individuais: 1/Ztotal = 1/Z1 + 1/Z2 + ... + 1/Zn',
        'corrente paralelo': 'Em um circuito CA em paralelo, a corrente total é a soma fasorial das correntes em cada ramo, considerando as diferenças de fase.',
        'tensao paralelo': 'Em um circuito CA em paralelo, a tensão é a mesma em todos os componentes: V = V1 = V2 = ... = Vn, mas varia senoidalmente com o tempo.',
        
        // Circuitos mistos
        'misto': 'Circuitos CA mistos combinam elementos em série e em paralelo. Para analisá-los, identifique as partes em série e em paralelo, aplique as regras específicas para cada parte e combine os resultados, considerando as relações fasoriais.',
        'circuito misto': 'Circuitos CA mistos combinam elementos em série e em paralelo. Para analisá-los, identifique as partes em série e em paralelo, aplique as regras específicas para cada parte e combine os resultados, considerando as relações fasoriais.',
        'analisar misto': 'Para analisar um circuito CA misto: 1) Identifique as partes em série e em paralelo, 2) Calcule as impedâncias equivalentes para cada parte, 3) Simplifique o circuito progressivamente, 4) Determine as grandezas elétricas em cada componente.',
        
        // Conceitos de CA
        'corrente alternada': 'A corrente alternada (CA) é uma corrente elétrica que inverte periodicamente sua direção. Sua principal vantagem é a facilidade de transformação de tensão, o que permite transmissão de energia a longas distâncias com menos perdas.',
        'ca': 'CA significa Corrente Alternada. É uma corrente elétrica que muda periodicamente de direção, geralmente em forma senoidal. É o tipo de corrente utilizada nas redes elétricas residenciais e industriais.',
        'frequencia': 'A frequência em circuitos CA é o número de ciclos completos por segundo, medida em Hertz (Hz). No Brasil, a frequência da rede elétrica é de 60 Hz, enquanto em muitos países da Europa é 50 Hz.',
        'fase': 'A fase em circuitos CA refere-se à posição relativa de uma onda senoidal em relação a outra. A diferença de fase entre tensão e corrente é crucial para análise de potência em circuitos CA.',
        
        // Componentes específicos de CA
        'capacitor': 'Em circuitos CA, o capacitor apresenta uma reatância capacitiva (Xc = 1/2πfC) que se opõe à variação de tensão. A corrente no capacitor está adiantada 90° em relação à tensão.',
        'indutor': 'Em circuitos CA, o indutor apresenta uma reatância indutiva (XL = 2πfL) que se opõe à variação de corrente. A corrente no indutor está atrasada 90° em relação à tensão.',
        'impedancia': 'A impedância é a oposição total ao fluxo de corrente alternada, combinando resistência e reatância. É representada por um número complexo Z = R + jX, onde R é a resistência e X é a reatância.',
        'reatancia': 'A reatância é a parte da impedância que surge devido a indutores (reatância indutiva, XL) e capacitores (reatância capacitiva, Xc) em circuitos CA.',
        
        // Potência em CA
        'potencia': 'Em circuitos CA, existem três tipos de potência: ativa (P, em watts), reativa (Q, em volt-ampères reativos) e aparente (S, em volt-ampères). A relação entre elas forma o triângulo de potências.',
        'fator de potencia': 'O fator de potência é a razão entre a potência ativa e a potência aparente (cos φ). Um fator de potência baixo indica uso ineficiente da energia elétrica.',
        'potencia ativa': 'A potência ativa (P) em circuitos CA é a potência realmente consumida pelo circuito, medida em watts (W). É calculada como P = VI cos φ, onde φ é o ângulo de fase entre tensão e corrente.',
        'potencia reativa': 'A potência reativa (Q) em circuitos CA é a potência que oscila entre a fonte e os elementos reativos, medida em volt-ampères reativos (VAr). É calculada como Q = VI sin φ.',
        
        // Circuito RLC
        'rlc': 'Um circuito RLC contém resistor (R), indutor (L) e capacitor (C). Em CA, pode apresentar comportamento ressonante quando as reatâncias indutiva e capacitiva se igualam.',
        'ressonancia': 'A ressonância ocorre em um circuito RLC quando a frequência faz com que as reatâncias indutiva e capacitiva se anulem. Na ressonância, a impedância é mínima e a corrente é máxima.',
        'frequencia ressonancia': 'A frequência de ressonância de um circuito RLC é calculada como f = 1/(2π√LC), onde L é a indutância e C é a capacitância.',
        
        // Realidade Aumentada
        'ra': 'Para acessar os recursos de Realidade Aumentada (RA), você precisa baixar o aplicativo SENAI Space disponível para Android e iOS. Depois, escaneie as tags RA disponíveis em nosso material didático.',
        'realidade aumentada': 'Para acessar os recursos de Realidade Aumentada (RA), você precisa baixar o aplicativo SENAI Space disponível para Android e iOS. Depois, escaneie as tags RA disponíveis em nosso material didático.',
        'senai space': 'O SENAI Space é o aplicativo oficial para acessar os recursos de Realidade Aumentada. Está disponível para Android na Play Store e para iOS na App Store.',
        'app': 'Para acessar os recursos de RA, você precisa baixar o aplicativo SENAI Space. Está disponível para Android na Play Store e para iOS na App Store.',
        'tags': 'As tags RA são marcadores que, quando escaneados pelo aplicativo SENAI Space, mostram conteúdo em Realidade Aumentada relacionado aos circuitos elétricos.',
        
        // Fallback
        'default': 'Desculpe, não tenho informações específicas sobre isso. Posso ajudar com dúvidas sobre circuitos CA em série, paralelo, mistos, componentes específicos de CA, ou conceitos como impedância, reatância e potência.'
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
    async function processUserInput(input) {
        // Converte para minúsculas e remove acentos para facilitar a correspondência
        const normalizedInput = input.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        // Tenta encontrar uma resposta na base de conhecimento local primeiro
        let response = knowledgeBase.default;
        if (knowledgeBase[normalizedInput]) {
            response = knowledgeBase[normalizedInput];
        } else {
            for (const key in knowledgeBase) {
                if (normalizedInput.includes(key)) {
                    response = knowledgeBase[key];
                    break;
                }
            }
        }

        // Se a base de conhecimento local não tiver uma resposta específica, consulta a OpenAI
        if (response === knowledgeBase.default) {
            try {
                const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${openaiApiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo", // Ou outro modelo de sua preferência
                        messages: [
                            { role: "system", content: "Você é um assistente especializado em circuitos elétricos, corrente alternada (CA), componentes eletrônicos (resistor, capacitor, indutor, transformador, motor, retificador, filtros, amplificador, oscilador), grandezas elétricas (tensão, corrente, potência, frequência, fase, impedância, reatância, fator de potência, ressonância) e Realidade Aumentada (RA) no contexto educacional. Responda de forma clara, concisa e didática, focando em conceitos fundamentais e aplicações práticas. Inclua informações sobre as tags de RA quando pertinente." },
                            { role: "user", content: input }
                        ],
                        max_tokens: 150,
                        temperature: 0.7
                    })
                });

                const data = await openaiResponse.json();
                if (data.choices && data.choices.length > 0) {
                    response = data.choices[0].message.content;
                } else {
                    response = "Desculpe, não consegui obter uma resposta da IA no momento. Tente novamente mais tarde.";
                }
            } catch (error) {
                console.error("Erro ao chamar a API da OpenAI:", error);
                response = "Ocorreu um erro ao tentar conectar com a inteligência artificial. Por favor, verifique sua conexão ou tente novamente.";
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
                    'Arraste uma bateria para a área de trabalho',
                    'Adicione resistores ou lâmpadas em sequência (um após o outro)',
                    'Conecte todos os componentes em um único caminho',
                    'Use o multímetro para medir a corrente em diferentes pontos (deve ser igual)',
                    'Verifique a tensão em cada componente (a soma deve ser igual à tensão da bateria)'
                ];
                break;
                
            case 'paralelo':
                instructions = [
                    'Arraste uma bateria para a área de trabalho',
                    'Crie múltiplos caminhos entre os terminais da bateria',
                    'Adicione resistores ou lâmpadas em cada caminho',
                    'Use o multímetro para medir a tensão em cada componente (deve ser igual)',
                    'Verifique a corrente em cada ramo (a soma deve ser igual à corrente total)'
                ];
                break;
                
            case 'misto':
                instructions = [
                    'Arraste uma bateria para a área de trabalho',
                    'Crie uma combinação de conexões em série e paralelo',
                    'Identifique as partes em série e em paralelo do circuito',
                    'Use o multímetro para analisar tensão e corrente em diferentes pontos',
                    'Compare os valores medidos com os valores calculados teoricamente'
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

