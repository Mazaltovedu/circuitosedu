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
    //BASE DE PESQUISA VIA OPENAI
    //const openaiApiKey = ""; // Removida por segurança. Por favor, use um backend para gerenciar chaves de API.

    
    // Base de conhecimento para o chatbot (simulando manus.ia)
    const knowledgeBase = {
        // Saudações e ajuda inicial
        "ola": "Olá! Sou o CircuitosEdu Assistente, sua IA para auxiliar no aprendizado de circuitos elétricos e automação industrial. Como posso ajudar você hoje?",
        "oi": "Olá! Sou o CircuitosEdu Assistente, sua IA para auxiliar no aprendizado de circuitos elétricos e automação industrial. Como posso ajudar você hoje?",
        "bom dia": "Bom dia! Sou o CircuitosEdu Assistente. Pronto para explorar o mundo dos circuitos e da automação?",
        "boa tarde": "Boa tarde! Sou o CircuitosEdu Assistente. Em que posso ser útil agora?",
        "boa noite": "Boa noite! Sou o CircuitosEdu Assistente. Tem alguma dúvida sobre circuitos ou automação?",
        "ajuda": "Posso ajudar com uma vasta gama de tópicos, incluindo: fundamentos de circuitos CA e CC, análise de circuitos em série, paralelo e misto, componentes eletrônicos, leis da eletricidade, conceitos de automação industrial (CLP, sensores, atuadores, redes industriais), e muito mais. O que você gostaria de saber especificamente?",
        "quem e voce": "Sou o CircuitosEdu Assistente, uma inteligência artificial desenvolvida para auxiliar estudantes de automação industrial no aprendizado de circuitos elétricos e tópicos relacionados. Minha base de conhecimento é constantemente atualizada para fornecer as informações mais precisas e relevantes.",
        "voce e o manus.ia": "Eu sou o CircuitosEdu Assistente, inspirado na capacidade de aprendizado e assistência da inteligência manus.ia. Meu objetivo é fornecer um suporte educacional robusto e interativo.",

        // Circuitos em Série (CA e CC)
        "serie": "Em um circuito em série, os componentes são conectados sequencialmente, formando um único caminho para a corrente. Em CC, a resistência total é a soma das resistências. Em CA, a impedância total é a soma vetorial das impedâncias individuais (Z_total = Z1 + Z2 + ...). A corrente é a mesma em todos os componentes em ambos os casos.",
        "circuito serie": "Um circuito em série é aquele onde os componentes estão ligados um após o outro, de modo que a corrente elétrica tem apenas um caminho a percorrer. Isso vale tanto para corrente contínua (CC) quanto para corrente alternada (CA).",
        "resistencia serie cc": "Em um circuito CC em série, a resistência total (ou equivalente) é a soma das resistências individuais: R_total = R1 + R2 + ... + Rn.",
        "impedancia serie ca": "Em um circuito CA em série, a impedância total é a soma vetorial das impedâncias individuais: Z_total = Z1 + Z2 + ... + Zn. Lembre-se que a impedância (Z) é um número complexo que inclui a resistência (R) e a reatância (X).",
        "corrente serie": "Tanto em CC quanto em CA, a corrente é a mesma em todos os componentes de um circuito em série: I_total = I1 = I2 = ... = In.",
        "tensao serie cc": "Em um circuito CC em série, a tensão total fornecida pela fonte é dividida entre os componentes: V_total = V1 + V2 + ... + Vn.",
        "tensao serie ca": "Em um circuito CA em série, a tensão total é a soma fasorial (vetorial) das tensões em cada componente, devido às possíveis defasagens entre elas: V_total = V1 + V2 + ... + Vn (soma vetorial).",

        // Circuitos em Paralelo (CA e CC)
        "paralelo": "Em um circuito em paralelo, os componentes são conectados em ramificações separadas, oferecendo múltiplos caminhos para a corrente. Em CC, o inverso da resistência total é a soma dos inversos das resistências. Em CA, o inverso da impedância total é a soma vetorial dos inversos das impedâncias. A tensão é a mesma em todos os componentes em ambos os casos.",
        "circuito paralelo": "Um circuito em paralelo é aquele onde os componentes estão ligados de forma que a corrente elétrica se divide entre eles, existindo múltiplos caminhos. A tensão sobre cada componente em paralelo é a mesma.",
        "resistencia paralelo cc": "Em um circuito CC em paralelo, o inverso da resistência total é a soma dos inversos das resistências individuais: 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn.",
        "impedancia paralelo ca": "Em um circuito CA em paralelo, o inverso da impedância total é a soma vetorial dos inversos das impedâncias individuais: 1/Z_total = 1/Z1 + 1/Z2 + ... + 1/Zn (soma vetorial).",
        "corrente paralelo cc": "Em um circuito CC em paralelo, a corrente total fornecida pela fonte é a soma das correntes em cada ramo: I_total = I1 + I2 + ... + In.",
        "corrente paralelo ca": "Em um circuito CA em paralelo, a corrente total é a soma fasorial (vetorial) das correntes em cada ramo: I_total = I1 + I2 + ... + In (soma vetorial).",
        "tensao paralelo": "Tanto em CC quanto em CA, a tensão é a mesma em todos os componentes de um circuito em paralelo: V_total = V1 = V2 = ... = Vn.",

        // Circuitos Mistos (CA e CC)
        "misto": "Circuitos mistos combinam elementos em série e em paralelo. Para analisá-los, tanto em CC quanto em CA, é preciso simplificar o circuito por partes, aplicando as regras de série e paralelo progressivamente. Em CA, as somas devem ser vetoriais devido às impedâncias.",
        "circuito misto": "Um circuito misto é uma combinação de partes em série e partes em paralelo. A análise requer identificar essas seções e aplicar as respectivas leis para simplificar o circuito até encontrar os valores desejados.",
        "analisar misto": "Para analisar um circuito misto: 1) Identifique as associações em série e em paralelo. 2) Calcule as resistências (CC) ou impedâncias (CA) equivalentes para cada associação. 3) Redesenhe o circuito simplificado. 4) Repita até obter um circuito série ou paralelo simples. 5) Calcule as grandezas totais e depois retorne aos circuitos originais para encontrar os valores em cada componente.",

        // Lei de Ohm e Leis de Kirchhoff
        "lei de ohm": "A Lei de Ohm afirma que a corrente (I) através de um condutor entre dois pontos é diretamente proporcional à tensão (V) entre esses dois pontos e inversamente proporcional à resistência (R) entre eles. Matematicamente: V = I * R. Em circuitos CA, usamos Z (impedância) no lugar de R: V = I * Z.",
        "leis de kirchhoff": "As Leis de Kirchhoff são duas: a Lei dos Nós (LKC ou primeira lei) e a Lei das Malhas (LKT ou segunda lei). Elas são fundamentais para a análise de circuitos mais complexos.",
        "lei dos nos": "A Lei dos Nós de Kirchhoff (LKC) afirma que a soma algébrica das correntes que entram em um nó é igual à soma algébrica das correntes que saem desse nó. Essencialmente, a soma das correntes em qualquer nó é zero (considerando entradas como positivas e saídas como negativas, ou vice-versa).",
        "lei das malhas": "A Lei das Malhas de Kirchhoff (LKT) afirma que a soma algébrica das diferenças de potencial (tensões) em qualquer caminho fechado (malha) de um circuito é igual a zero. Ou seja, a soma das elevações de tensão é igual à soma das quedas de tensão em uma malha.",

        // Conceitos de CA
        "corrente alternada": "A corrente alternada (CA ou AC, do inglês Alternating Current) é um tipo de corrente elétrica cujo sentido varia no tempo, ao contrário da corrente contínua (CC ou DC) que tem sentido constante. A forma de onda mais comum da CA é a senoidal.",
        "ca": "CA significa Corrente Alternada. É uma corrente elétrica que muda periodicamente de direção e magnitude, geralmente de forma senoidal. É o tipo de corrente que chega às nossas casas e indústrias.",
        "frequencia": "A frequência (f) em circuitos CA é o número de ciclos completos que a onda de corrente ou tensão realiza por segundo. É medida em Hertz (Hz). No Brasil, a frequência padrão da rede elétrica é 60 Hz.",
        "periodo": "O período (T) em circuitos CA é o tempo que a onda de corrente ou tensão leva para completar um ciclo. É o inverso da frequência: T = 1/f. É medido em segundos (s).",
        "valor de pico": "O valor de pico (Vp ou Ip) de uma onda senoidal CA é a sua amplitude máxima, ou seja, o maior valor instantâneo que a tensão ou corrente atinge em um ciclo.",
        "valor eficaz": "O valor eficaz (Vrms ou Irms, do inglês Root Mean Square) de uma tensão ou corrente CA é o valor que produziria o mesmo efeito de aquecimento em um resistor que uma corrente contínua de mesmo valor. Para uma onda senoidal, Vrms = Vp / √2 e Irms = Ip / √2.",
        "fase": "A fase em circuitos CA descreve a posição de um ponto no tempo dentro de um ciclo de uma forma de onda. A diferença de fase (ângulo de fase, φ) entre duas ondas (por exemplo, tensão e corrente) indica o quanto uma está adiantada ou atrasada em relação à outra.",
        "defasagem": "Defasagem é a diferença de fase entre duas ondas senoidais de mesma frequência. Em circuitos CA, a defasagem entre tensão e corrente é causada por componentes reativos como indutores e capacitores.",

        // Componentes (CC e CA)
        "resistor": "O resistor é um componente passivo que se opõe à passagem de corrente elétrica, convertendo energia elétrica em calor (efeito Joule). Sua principal característica é a resistência (R), medida em Ohms (Ω).",
        "capacitor": "O capacitor é um componente que armazena energia em um campo elétrico formado entre duas placas condutoras separadas por um dielétrico. Sua capacidade de armazenamento é a capacitância (C), medida em Farads (F). Em CA, ele oferece uma oposição à passagem da corrente chamada reatância capacitiva (Xc).",
        "reatancia capacitiva": "Reatância capacitiva (Xc) é a oposição que um capacitor oferece à passagem de corrente alternada. É inversamente proporcional à frequência (f) e à capacitância (C): Xc = 1 / (2πfC).",
        "indutor": "O indutor (ou bobina) é um componente que armazena energia em um campo magnético gerado pela passagem de corrente elétrica por um fio enrolado. Sua principal característica é a indutância (L), medida em Henrys (H). Em CA, ele oferece uma oposição à passagem da corrente chamada reatância indutiva (Xl).",
        "reatancia indutiva": "Reatância indutiva (Xl) é a oposição que um indutor oferece à passagem de corrente alternada. É diretamente proporcional à frequência (f) e à indutância (L): Xl = 2πfL.",
        "impedancia": "A impedância (Z) é a oposição total que um circuito CA oferece à passagem de corrente. Ela combina a resistência (R) e a reatância (X, que pode ser Xl - Xc). É uma grandeza vetorial, Z = R + jX, e seu módulo é |Z| = √(R² + X²). Medida em Ohms (Ω).",
        "reatancia": "Reatância (X) é a oposição à corrente alternada devida à presença de indutores (reatância indutiva, Xl) e/ou capacitores (reatância capacitiva, Xc). É a parte imaginária da impedância.",
        "diodo": "O diodo é um componente semicondutor que permite a passagem de corrente elétrica predominantemente em uma única direção (polarização direta) e bloqueia na direção oposta (polarização reversa).",
        "led": "O LED (Light Emitting Diode ou Diodo Emissor de Luz) é um tipo especial de diodo que emite luz quando polarizado diretamente. É usado em iluminação, displays, sinalização, etc.",
        "transformador": "O transformador é um dispositivo que transfere energia elétrica de um circuito para outro através de campos magnéticos variáveis, geralmente alterando os níveis de tensão e corrente. Funciona apenas com corrente alternada.",

        // Potência (CC e CA)
        "potencia cc": "Em corrente contínua (CC), a potência elétrica (P) consumida por um componente é dada por P = V * I, onde V é a tensão sobre o componente e I é a corrente através dele. Também pode ser P = I² * R ou P = V² / R. Medida em Watts (W).",
        "potencia ca": "Em corrente alternada (CA), a análise de potência é mais complexa. Temos a potência ativa (P), potência reativa (Q) e potência aparente (S).",
        "potencia ativa": "Potência Ativa (P), também chamada de potência real ou média, é a potência efetivamente convertida em trabalho útil (calor, luz, movimento). É medida em Watts (W). Em CA, P = Vrms * Irms * cos(φ), onde φ é o ângulo de defasagem entre tensão e corrente.",
        "potencia reativa": "Potência Reativa (Q) é a potência que oscila entre a fonte e os elementos reativos (indutores e capacitores) do circuito, não realizando trabalho útil, mas sendo necessária para criar campos magnéticos e elétricos. É medida em Volt-Ampère Reativo (VAr). Q = Vrms * Irms * sin(φ).",
        "potencia aparente": "Potência Aparente (S) é a potência total que a fonte precisa fornecer ao circuito CA. É a combinação vetorial da potência ativa e reativa: S = √(P² + Q²). É medida em Volt-Ampère (VA). S = Vrms * Irms.",
        "fator de potencia": "O Fator de Potência (FP) é a razão entre a potência ativa (P) e a potência aparente (S): FP = P/S = cos(φ). Ele indica a eficiência com que a energia elétrica é utilizada. Um FP próximo de 1 é ideal.",
        "triangulo de potencias": "O Triângulo de Potências é uma representação gráfica da relação entre as potências ativa (P), reativa (Q) e aparente (S) em um circuito CA. P é o cateto adjacente, Q o cateto oposto e S a hipotenusa, com o ângulo φ entre P e S.",

        // Circuito RLC
        "rlc": "Um circuito RLC é um circuito elétrico que contém um resistor (R), um indutor (L) e um capacitor (C), conectados em série ou em paralelo. Em CA, seu comportamento é fortemente dependente da frequência devido às reatâncias.",
        "ressonancia": "Ressonância em um circuito RLC ocorre quando a reatância indutiva (Xl) se iguala à reatância capacitiva (Xc). Nessa condição, a impedância do circuito atinge seu valor mínimo (em série) ou máximo (em paralelo), e a corrente pode ser máxima (série) ou mínima (paralelo).",
        "frequencia de ressonancia": "A frequência de ressonância (fr) de um circuito RLC série ou paralelo é a frequência na qual Xl = Xc. É calculada por: fr = 1 / (2π√(LC)).",

        // Automação Industrial - Conceitos Gerais
        "automacao industrial": "Automação industrial é o uso de sistemas de controle, como computadores ou robôs, e tecnologias da informação para lidar com diferentes processos e máquinas em uma indústria para substituir um ser humano. O objetivo é aumentar a produtividade, melhorar a qualidade, reduzir custos e aumentar a segurança.",
        "o que e automacao": "Automação é a aplicação de técnicas, softwares e/ou equipamentos específicos em uma determinada máquina ou processo com o objetivo de aumentar a sua eficiência, maximizar a produção com o menor consumo de energia e/ou matérias primas, menor emissão de resíduos e melhores condições de segurança.",
        "piramide da automacao": "A Pirâmide da Automação representa os diferentes níveis hierárquicos de controle e informação em um sistema de automação industrial. Geralmente possui 5 níveis: Nível 1 (Chão de Fábrica - Sensores e Atuadores), Nível 2 (Controle - CLPs, SDCDs), Nível 3 (Supervisão - Sistemas SCADA), Nível 4 (Planejamento - MES) e Nível 5 (Gerenciamento Corporativo - ERP).",

        // Automação Industrial - CLP (Controlador Lógico Programável)
        "clp": "CLP (Controlador Lógico Programável), ou PLC (Programmable Logic Controller) em inglês, é um computador industrial especializado usado para controlar processos industriais, como linhas de montagem, máquinas ou processos que exigem alta confiabilidade, facilidade de programação e diagnóstico de falhas.",
        "o que e clp": "Um CLP é um equipamento eletrônico digital com hardware e software compatíveis com aplicações industriais. Ele monitora entradas (sensores), toma decisões baseadas em sua programação e controla saídas (atuadores) para automatizar um processo.",
        "programacao clp": "A programação de CLPs é feita usando linguagens padronizadas pela norma IEC 61131-3, como Ladder Diagram (LD), Function Block Diagram (FBD), Structured Text (ST), Instruction List (IL) e Sequential Function Chart (SFC).",
        "linguagem ladder": "Ladder Diagram (LD) é uma das linguagens de programação mais populares para CLPs. Sua representação gráfica se assemelha a um diagrama de comandos elétricos com contatos e bobinas, facilitando a compreensão por técnicos e engenheiros eletricistas.",

        // Automação Industrial - Sensores e Atuadores
        "sensores": "Sensores são dispositivos que detectam e respondem a algum tipo de estímulo do ambiente físico. Em automação, eles convertem uma grandeza física (temperatura, pressão, posição, etc.) em um sinal elétrico que pode ser lido por um sistema de controle, como um CLP.",
        "tipos de sensores": "Existem diversos tipos de sensores industriais, como sensores indutivos (detectam metais), capacitivos (detectam diversos materiais), ópticos (usam luz), de temperatura (termopares, RTDs), de pressão, de nível, encoders (posição/velocidade), etc.",
        "atuadores": "Atuadores são dispositivos que convertem um sinal de controle (geralmente elétrico) em uma ação física no processo industrial. Eles realizam o trabalho, como mover, aquecer, ligar/desligar algo.",
        "tipos de atuadores": "Exemplos comuns de atuadores incluem motores elétricos, cilindros pneumáticos e hidráulicos, válvulas solenoides, contatores, inversores de frequência, aquecedores, etc.",

        // Automação Industrial - Redes Industriais
        "redes industriais": "Redes industriais são sistemas de comunicação de dados projetados para operar em ambientes industriais, conectando dispositivos como CLPs, IHMs (Interfaces Homem-Máquina), sensores, atuadores e computadores. Elas precisam ser robustas, confiáveis e, muitas vezes, determinísticas.",
        "protocolos de comunicacao": "Existem vários protocolos de comunicação para redes industriais, como Modbus, Profibus, Profinet, DeviceNet, Ethernet/IP, AS-Interface, HART, Foundation Fieldbus, entre outros. Cada um tem suas características e aplicações específicas.",
        "modbus": "Modbus é um protocolo de comunicação serial simples e amplamente utilizado na automação industrial. É um protocolo mestre-escravo, onde um dispositivo mestre solicita dados de dispositivos escravos.",
        "profibus": "Profibus (Process Field Bus) é um padrão de rede de campo digital robusto e versátil, usado para comunicação entre CLPs, sistemas de supervisão e dispositivos de campo. Existem variantes como Profibus DP (Periferia Descentralizada) e Profibus PA (Automação de Processos).",
        "profinet": "Profinet é um padrão Ethernet industrial que permite a comunicação em tempo real entre dispositivos de automação. É baseado em Ethernet TCP/IP e oferece alta velocidade e flexibilidade.",

        // Automação Industrial - Sistemas de Supervisão
        "scada": "SCADA (Supervisory Control and Data Acquisition) é um sistema de software e hardware que permite às indústrias controlar processos local ou remotamente, monitorar, coletar e processar dados em tempo real, e interagir diretamente com dispositivos como sensores, válvulas, bombas, motores, através de IHMs.",
        "ihm": "IHM (Interface Homem-Máquina), ou HMI (Human-Machine Interface) em inglês, é um dispositivo ou software que permite a interação entre um operador humano e uma máquina ou sistema de controle. Geralmente apresenta informações do processo de forma gráfica e permite que o operador insira comandos.",
        "mes": "MES (Manufacturing Execution System) é um sistema de informação que conecta, monitora e controla sistemas complexos de manufatura e fluxos de dados no chão de fábrica. O objetivo principal de um MES é garantir a execução eficaz das operações de manufatura e melhorar a eficiência da produção.",
        "erp": "ERP (Enterprise Resource Planning) é um sistema de software de gestão empresarial que integra diversas áreas de uma empresa, como finanças, recursos humanos, manufatura, cadeia de suprimentos, serviços, compras, etc. Em automação, o ERP pode estar no topo da pirâmide, recebendo dados do MES.",

        // Instrumentos de Medição (geral)
        "multimetro": "O multímetro é um instrumento eletrônico versátil usado para medir diversas grandezas elétricas, como tensão (volts), corrente (amperes) e resistência (ohms). Alguns modelos também medem capacitância, frequência, temperatura, etc.",
        "amperimetro": "O amperímetro é um instrumento usado para medir a intensidade da corrente elétrica em um circuito. Deve ser conectado em série com o trecho do circuito onde se deseja medir a corrente.",
        "voltimetro": "O voltímetro é um instrumento usado para medir a diferença de potencial (tensão elétrica) entre dois pontos de um circuito. Deve ser conectado em paralelo com o componente ou trecho do circuito cuja tensão se deseja medir.",
        "osciloscopio": "O osciloscópio é um instrumento que permite visualizar graficamente sinais elétricos variáveis no tempo. Ele exibe a forma de onda da tensão, permitindo analisar sua amplitude, frequência, período, fase e outras características.",

        // Segurança em Eletricidade e Automação
        "seguranca eletrica": "Segurança elétrica envolve um conjunto de práticas e normas para prevenir acidentes com eletricidade, como choques elétricos, curtos-circuitos e incêndios. Inclui o uso de EPIs (Equipamentos de Proteção Individual), EPCs (Equipamentos de Proteção Coletiva) e o cumprimento de normas como a NR-10 no Brasil.",
        "nr-10": "A NR-10 é a Norma Regulamentadora brasileira que estabelece os requisitos e condições mínimas para a implementação de medidas de controle e sistemas preventivos, de forma a garantir a segurança e a saúde dos trabalhadores que, direta ou indiretamente, interajam em instalações elétricas e serviços com eletricidade.",
        "choque eletrico": "Choque elétrico é a passagem de corrente elétrica através do corpo. Seus efeitos podem variar de um leve formigamento a queimaduras graves, parada cardiorrespiratória e morte, dependendo da intensidade da corrente, do caminho percorrido, do tempo de exposição e das condições do indivíduo.",
        "aterramento": "Aterramento é a ligação intencional de um sistema ou equipamento elétrico à terra, com o objetivo de proteger pessoas contra choques elétricos e equipamentos contra sobretensões. Ele cria um caminho de baixa resistência para correntes de falta.",
        "disjuntor": "O disjuntor é um dispositivo de proteção que interrompe automaticamente o fluxo de corrente elétrica em um circuito quando detecta uma sobrecarga ou um curto-circuito, prevenindo danos aos equipamentos e riscos de incêndio.",
        "fusivel": "O fusível é um dispositivo de proteção que contém um filamento que se rompe (queima) quando a corrente elétrica ultrapassa um valor seguro por um determinado tempo, interrompendo o circuito. Diferente do disjuntor, o fusível precisa ser substituído após atuar.",

        // Realidade Aumentada (mantido e revisado)
        "ra": "Para explorar os recursos de Realidade Aumentada (RA) desta plataforma, você precisará do aplicativo SENAI Space. Ele está disponível para download nas lojas de aplicativos Android e iOS. Após instalar, utilize o app para escanear as tags RA que acompanham nosso material didático e visualize modelos 3D interativos.",
        "realidade aumentada": "A Realidade Aumentada (RA) sobrepõe informações digitais, como modelos 3D e animações, ao mundo real através da câmera do seu dispositivo. Com o app SENAI Space, você pode visualizar componentes e circuitos de forma interativa.",
        "senai space": "O SENAI Space é o aplicativo que permite o acesso às experiências de Realidade Aumentada. Procure por 'SENAI Space' na Google Play Store (Android) ou na App Store (iOS) para baixar e instalar.",
        "app ra": "O aplicativo para os recursos de RA é o SENAI Space. Ele foi desenvolvido para proporcionar uma experiência de aprendizado mais imersiva e interativa.",
        "tags ra": "As tags RA são marcadores visuais (como QR codes ou imagens específicas) que, ao serem escaneadas pelo aplicativo SENAI Space, ativam a exibição do conteúdo de Realidade Aumentada correspondente.",

        // Fallback (Mensagem padrão para perguntas não compreendidas)
        "default": "Desculpe, não consegui encontrar uma resposta específica para sua pergunta em minha base de conhecimento atual. Minha inteligência está em constante aprendizado! Você poderia reformular sua pergunta ou tentar termos mais específicos sobre circuitos elétricos (CA/CC), componentes, leis da eletricidade ou automação industrial (CLPs, sensores, atuadores, redes)? Estou aqui para ajudar da melhor forma possível."
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
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
        
        // Inicializa a resposta com o valor padrão
        let response = knowledgeBase.default;
        let bestMatchScore = 0;
        let bestMatchKey = '';
        
        // Verifica se há correspondência exata
        if (knowledgeBase[normalizedInput]) {
            return addMessage(knowledgeBase[normalizedInput]);
        }
        
        // Divide a entrada em palavras para busca por palavras-chave
        const inputWords = normalizedInput.split(/\s+/);
        
        // Procura por correspondência parcial com pontuação
        for (const key in knowledgeBase) {
            if (key === 'default') continue;
            
            // Correspondência direta de substring
            if (normalizedInput.includes(key)) {
                const score = key.length / normalizedInput.length;
                if (score > bestMatchScore) {
                    bestMatchScore = score;
                    bestMatchKey = key;
                }
                continue;
            }
            
            // Correspondência de palavras individuais
            const keyWords = key.split(/\s+/);
            let matchCount = 0;
            
            for (const word of inputWords) {
                if (word.length <= 2) continue; // Ignora palavras muito curtas
                
                if (keyWords.some(keyWord => keyWord.includes(word) || word.includes(keyWord))) {
                    matchCount++;
                }
            }
            
            if (matchCount > 0) {
                const score = matchCount / Math.max(inputWords.length, keyWords.length);
                if (score > bestMatchScore) {
                    bestMatchScore = score;
                    bestMatchKey = key;
                }
            }
        }
        
        // Define um limiar para considerar uma correspondência válida
        if (bestMatchScore > 0.3) {
            response = knowledgeBase[bestMatchKey];
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

