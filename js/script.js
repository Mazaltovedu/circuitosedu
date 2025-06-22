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
    // URLs base para as simulações PHET
    const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html';
    
    // Parâmetros para diferentes tipos de circuitos
    const circuitParams = {
        serie: '?locale=pt&screens=0&circuit=series',
        paralelo: '?locale=pt&screens=0&circuit=parallel',
        misto: '?locale=pt&screens=0&circuit=mixed'
    };
    
    // Base de conhecimento expandida para o chatbot
    const knowledgeBase = {
        // Saudações e ajuda inicial
        "ola": "Olá! Sou o CircuitosEdu Assistente, sua IA para auxiliar no aprendizado de circuitos elétricos e automação industrial. Como posso ajudar você hoje?",
        "oi": "Olá! Sou o CircuitosEdu Assistente, sua IA para auxiliar no aprendizado de circuitos elétricos e automação industrial. Como posso ajudar você hoje?",
        "bom dia": "Bom dia! Sou o CircuitosEdu Assistente. Pronto para explorar o mundo dos circuitos e da automação?",
        "boa tarde": "Boa tarde! Sou o CircuitosEdu Assistente. Em que posso ser útil agora?",
        "boa noite": "Boa noite! Sou o CircuitosEdu Assistente. Tem alguma dúvida sobre circuitos ou automação?",
        "ajuda": "Posso ajudar com uma vasta gama de tópicos, incluindo: fundamentos de circuitos CA e CC, análise de circuitos em série, paralelo e misto, componentes eletrônicos, leis da eletricidade, conceitos de automação industrial (CLP, sensores, atuadores, redes industriais), motores DC e trifásicos, sensores indutivos e capacitivos, e muito mais. O que você gostaria de saber especificamente?",
        "quem e voce": "Sou o CircuitosEdu Assistente, uma inteligência artificial desenvolvida para auxiliar estudantes de automação industrial no aprendizado de circuitos elétricos e tópicos relacionados. Minha base de conhecimento é constantemente atualizada para fornecer as informações mais precisas e relevantes.",

        // Motor DC
        "motor dc": "Um motor de corrente contínua (CC ou DC) é uma máquina elétrica que converte energia elétrica CC em energia mecânica. Seu funcionamento baseia-se na interação entre um campo magnético (criado por ímãs permanentes ou bobinas de campo) e a corrente elétrica que percorre as bobinas do rotor (armadura).",
        "funcionamento motor dc": "Quando a corrente elétrica passa pelas bobinas do rotor, ela interage com o campo magnético fixo, gerando uma força que causa o movimento de rotação. Um comutador e escovas garantem que a corrente no rotor sempre flua na direção correta para manter o torque em uma única direção.",
        "caracteristicas motor dc": "As principais características de um motor DC incluem: controle de velocidade relativamente simples (variando a tensão ou corrente de armadura), alto torque de partida, e a necessidade de escovas e comutador (em motores com escovas), que podem gerar desgaste e faíscas. Existem também motores DC sem escovas (Brushless DC - BLDC) que eliminam esses problemas.",

        // Motor Trifásico
        "motor trifasico": "Um motor trifásico é uma máquina elétrica que converte energia elétrica de corrente alternada (CA) trifásica em energia mecânica. É amplamente utilizado na indústria devido à sua robustez, eficiência e capacidade de operar com altas potências.",
        "funcionamento motor trifasico": "O funcionamento do motor trifásico baseia-se na criação de um campo magnético girante no estator (parte fixa) a partir das três fases da corrente alternada. Esse campo magnético induz uma corrente no rotor (parte giratória), que por sua vez gera um campo magnético próprio. A interação entre o campo do estator e do rotor produz o torque que faz o motor girar.",
        "caracteristicas motor trifasico": "As principais características de um motor trifásico incluem: alta eficiência, autostart (não precisa de dispositivos auxiliares para partida), robustez, baixo custo de manutenção (motores de indução), e a capacidade de operar em diversas velocidades e potências. São ideais para aplicações industriais que exigem alta potência e confiabilidade.",

        // Valores Comerciais de Componentes Eletrônicos
        "valores comerciais componentes": "Os valores comerciais de componentes eletrônicos (resistores, capacitores, indutores, etc.) são padronizados para facilitar a fabricação e a substituição. Para resistores, por exemplo, existem as séries E (E6, E12, E24, E48, E96, E192) que definem os valores preferenciais com base em tolerâncias. É importante consultar catálogos de fabricantes ou distribuidores para obter os valores exatos e a disponibilidade.",
        "onde comprar componentes": "Componentes eletrônicos podem ser adquiridos em lojas especializadas em eletrônica, distribuidores de componentes (online ou físicos) e plataformas de e-commerce. Alguns exemplos incluem Farnell, Mouser, Digi-Key, RS Components, e no Brasil, empresas como Newark, Soldafria, entre outras.",

        // Sensores Indutivos e Capacitivos
        "sensor indutivo": "Um sensor indutivo é um tipo de sensor de proximidade que detecta a presença de objetos metálicos sem contato físico. Ele funciona gerando um campo eletromagnético de alta frequência. Quando um objeto metálico entra nesse campo, ele induz correntes parasitas no objeto, que por sua vez alteram o campo magnético do sensor, detectando assim a presença do objeto.",
        "aplicacao sensor indutivo": "Sensores indutivos são amplamente utilizados na automação industrial para detecção de posição de peças metálicas, contagem de objetos, controle de velocidade e presença em linhas de montagem, máquinas-ferramenta, robótica, e sistemas de transporte.",
        "sensor capacitivo": "Um sensor capacitivo é um tipo de sensor de proximidade que detecta a presença de objetos (metálicos ou não metálicos) sem contato físico. Ele funciona gerando um campo elétrico. A presença de um objeto altera a capacitância do sensor, que é detectada e convertida em um sinal de saída.",
        "aplicacao sensor capacitivo": "Sensores capacitivos são versáteis e utilizados para detecção de nível de líquidos ou materiais granulados (em tanques, silos), detecção de objetos não metálicos (plástico, madeira, vidro), controle de posição, e em aplicações onde a detecção de materiais diversos é necessária, como na indústria alimentícia e farmacêutica.",

        // Circuitos em Série (CA e CC)
        "serie": "Em um circuito em série, os componentes são conectados sequencialmente, formando um único caminho para a corrente. Em CC, a resistência total é a soma das resistências. Em CA, a impedância total é a soma vetorial das impedâncias individuais (Z_total = Z1 + Z2 + ...). A corrente é a mesma em todos os componentes em ambos os casos.",
        "circuito serie": "Um circuito em série é aquele onde os componentes estão ligados um após o outro, de modo que a corrente elétrica tem apenas um caminho a percorrer. Isso vale tanto para corrente contínua (CC) quanto para corrente alternada (CA).",

        // Circuitos em Paralelo (CA e CC)
        "paralelo": "Em um circuito em paralelo, os componentes são conectados em ramificações separadas, oferecendo múltiplos caminhos para a corrente. Em CC, o inverso da resistência total é a soma dos inversos das resistências. Em CA, o inverso da impedância total é a soma vetorial dos inversos das impedâncias. A tensão é a mesma em todos os componentes em ambos os casos.",
        "circuito paralelo": "Um circuito em paralelo é aquele onde os componentes estão ligados de forma que a corrente elétrica se divide entre eles, existindo múltiplos caminhos. A tensão sobre cada componente em paralelo é a mesma.",

        // Circuitos Mistos (CA e CC)
        "misto": "Circuitos mistos combinam elementos em série e em paralelo. Para analisá-los, tanto em CC quanto em CA, é preciso simplificar o circuito por partes, aplicando as regras de série e paralelo progressivamente. Em CA, as somas devem ser vetoriais devido às impedâncias.",
        "circuito misto": "Um circuito misto é uma combinação de partes em série e partes em paralelo. A análise requer identificar essas seções e aplicar as respectivas leis para simplificar o circuito até encontrar os valores desejados.",

        // Lei de Ohm e Leis de Kirchhoff
        "lei de ohm": "A Lei de Ohm afirma que a corrente (I) através de um condutor entre dois pontos é diretamente proporcional à tensão (V) entre esses dois pontos e inversamente proporcional à resistência (R) entre eles. Matematicamente: V = I * R. Em circuitos CA, usamos Z (impedância) no lugar de R: V = I * Z.",
        "leis de kirchhoff": "As Leis de Kirchhoff são duas: a Lei dos Nós (LKC ou primeira lei) e a Lei das Malhas (LKT ou segunda lei). Elas são fundamentais para a análise de circuitos mais complexos.",

        // Conceitos de CA
        "corrente alternada": "A corrente alternada (CA ou AC, do inglês Alternating Current) é um tipo de corrente elétrica cujo sentido varia no tempo, ao contrário da corrente contínua (CC ou DC) que tem sentido constante. A forma de onda mais comum da CA é a senoidal.",
        "ca": "CA significa Corrente Alternada. É uma corrente elétrica que muda periodicamente de direção e magnitude, geralmente de forma senoidal. É o tipo de corrente que chega às nossas casas e indústrias.",

        // Componentes
        "resistor": "O resistor é um componente passivo que se opõe à passagem de corrente elétrica, convertendo energia elétrica em calor (efeito Joule). Sua principal característica é a resistência (R), medida em Ohms (Ω).",
        "capacitor": "O capacitor é um componente que armazena energia em um campo elétrico formado entre duas placas condutoras separadas por um dielétrico. Sua capacidade de armazenamento é a capacitância (C), medida em Farads (F). Em CA, ele oferece uma oposição à passagem da corrente chamada reatância capacitiva (Xc).",
        "indutor": "O indutor (ou bobina) é um componente que armazena energia em um campo magnético gerado pela passagem de corrente elétrica por um fio enrolado. Sua principal característica é a indutância (L), medida em Henrys (H). Em CA, ele oferece uma oposição à passagem da corrente chamada reatância indutiva (Xl).",

        // Automação Industrial
        "automacao industrial": "Automação industrial é o uso de sistemas de controle, como computadores ou robôs, e tecnologias da informação para lidar com diferentes processos e máquinas em uma indústria para substituir um ser humano. O objetivo é aumentar a produtividade, qualidade e segurança, reduzindo custos e tempo de produção.",
        "clp": "CLP (Controlador Lógico Programável) ou PLC (Programmable Logic Controller) é um computador industrial robusto usado para automatizar processos eletromecânicos, como controle de máquinas em linhas de montagem, parques de diversões, ou sistemas de iluminação. É programado através de linguagens específicas como Ladder, FBD, ou ST.",
        "sensores": "Sensores são dispositivos que detectam e respondem a algum tipo de entrada do ambiente físico. A entrada específica pode ser luz, calor, movimento, umidade, pressão, ou qualquer um de uma grande variedade de outros fenômenos ambientais. A saída é geralmente um sinal que é convertido para uso humano ou enviado eletronicamente através de uma rede para leitura ou processamento adicional.",

        // Padrão de resposta para termos não encontrados
        "default": "Desculpe, não tenho informações específicas sobre esse tópico em minha base de conhecimento atual. Posso ajudar com questões sobre circuitos elétricos (CA e CC), componentes eletrônicos, motores (DC e trifásicos), sensores (indutivos e capacitivos), automação industrial, CLPs, instrumentação, ou outros tópicos relacionados. Você poderia reformular sua pergunta ou especificar melhor o que gostaria de saber?"
    };

    // ===== Funções do Chatbot =====
    
    // Função para processar a entrada do usuário com IA (OpenAI API)
    async function processUserInput(message) {
        try {
            // Adiciona indicador de carregamento
            addMessage('Processando...', 'bot', true);
            
            const response = await fetch('http://localhost:5000/chat', {
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
                addMessage(data.response, 'bot');
            } else if (response.status === 429) {
                // Quota excedida, usar fallback local
                processUserInputLocal(message);
            } else {
                throw new Error('Erro na comunicação com o servidor');
            }
        } catch (error) {
            // Remove o indicador de carregamento
            removeLoadingMessage();
            
            // Em caso de erro, usar base de conhecimento local
            console.log('Erro na API, usando fallback local:', error);
            processUserInputLocal(message);
        }
    }
    
    // Função para processar entrada com base de conhecimento local (fallback)
    function processUserInputLocal(message) {
        const normalizedMessage = message.toLowerCase()
            .replace(/[áàâãä]/g, 'a')
            .replace(/[éèêë]/g, 'e')
            .replace(/[íìîï]/g, 'i')
            .replace(/[óòôõö]/g, 'o')
            .replace(/[úùûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9\s]/g, '')
            .trim();

        let response = knowledgeBase["default"];
        
        // Busca por palavras-chave na base de conhecimento
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (key !== "default" && normalizedMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Adiciona uma pequena variação para simular processamento
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 500);
    }
    
    // Função para adicionar mensagem ao chat
    function addMessage(message, sender, isLoading = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        if (isLoading) {
            messageDiv.classList.add('loading');
            messageDiv.innerHTML = `
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="loading-text">${message}</span>
            `;
        } else {
            messageDiv.textContent = message;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Função para remover mensagem de carregamento
    function removeLoadingMessage() {
        const loadingMessage = chatMessages.querySelector('.message.loading');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }
    
    // Função para enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
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
            chatbotBody.style.display = chatbotBody.style.display === 'none' ? 'block' : 'none';
        });
    }
    
    // Abrir chat no mobile
    if (openChatMobile) {
        openChatMobile.addEventListener('click', function() {
            chatbotBody.style.display = 'block';
        });
    }
    
    // ===== Funcionalidades das Simulações =====
    
    // Função para carregar simulação específica
    function loadSimulation(type) {
        if (phetIframe && circuitParams[type]) {
            const newUrl = phetBaseUrl + circuitParams[type];
            phetIframe.src = newUrl;
            
            // Atualiza o seletor de tipo de circuito
            if (circuitType) {
                circuitType.value = type;
            }
            
            // Atualiza as instruções
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
                "Observe como a corrente se divide entre os ramos"
            ],
            misto: [
                "Arraste uma fonte de tensão CA para a área de trabalho",
                "Crie uma combinação de elementos em série e paralelo",
                "Identifique as seções em série e paralelo do circuito",
                "Meça tensões e correntes em diferentes pontos",
                "Analise como as leis de série e paralelo se aplicam em cada seção"
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
    
    // Event listener para mudança no seletor de tipo de circuito
    if (circuitType) {
        circuitType.addEventListener('change', function() {
            loadSimulation(this.value);
        });
    }
    
    // ===== Funcionalidades de Navegação =====
    
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

