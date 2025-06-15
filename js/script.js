// Dados dos recursos de Realidade Aumentada
const arResources = [
    // Conceitos Básicos
    {
        id: '97vn',
        title: 'Geração de Energia',
        description: 'Explore os princípios fundamentais da geração de energia elétrica em 3D.',
        category: 'basicos',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/97vn',
        iosUrl: 'https://senaispace.senai.br/97vn',
        icon: 'fas fa-bolt',
        size: '19.0 MB',
        concepts: ['Geração de energia', 'Fontes de energia', 'Transformação energética']
    },
    {
        id: 'KjC3',
        title: 'Circuito Elétrico',
        description: 'Visualize os componentes básicos de um circuito elétrico e suas conexões.',
        category: 'basicos',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/KjC3',
        iosUrl: 'https://senaispace.senai.br/KjC3',
        icon: 'fas fa-project-diagram',
        size: '561.5 kB',
        concepts: ['Circuitos básicos', 'Componentes elétricos', 'Conexões']
    },
    {
        id: 'cgkz',
        title: 'Corrente Elétrica',
        description: 'Compreenda o conceito de corrente elétrica e seu comportamento.',
        category: 'basicos',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/cgkz',
        iosUrl: 'https://senaispace.senai.br/cgkz',
        icon: 'fas fa-arrow-right',
        size: '347.3 kB',
        concepts: ['Corrente elétrica', 'Fluxo de elétrons', 'Intensidade']
    },
    
    // Componentes Eletrônicos
    {
        id: 'Yt1d',
        title: 'Resistor',
        description: 'Explore as características e funcionamento dos resistores.',
        category: 'componentes',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/Yt1d',
        iosUrl: 'https://senaispace.senai.br/Yt1d',
        icon: 'fas fa-minus',
        size: '279.5 kB',
        concepts: ['Resistência elétrica', 'Lei de Ohm', 'Código de cores']
    },
    {
        id: '828E',
        title: 'Solenóide',
        description: 'Visualize o funcionamento de um solenóide e seus campos magnéticos.',
        category: 'componentes',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/828E',
        iosUrl: 'https://senaispace.senai.br/828E',
        icon: 'fas fa-magnet',
        size: '504.3 kB',
        concepts: ['Eletromagnetismo', 'Campo magnético', 'Indução']
    },
    {
        id: 'JmdA',
        title: 'Circuito Eletrônico',
        description: 'Analise circuitos eletrônicos complexos em detalhes.',
        category: 'componentes',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/JmdA',
        iosUrl: 'https://senaispace.senai.br/JmdA',
        icon: 'fas fa-microchip',
        size: '561.5 kB',
        concepts: ['Eletrônica', 'Circuitos integrados', 'Componentes ativos']
    },
    {
        id: 'aQD4',
        title: 'Circuito Retificador',
        description: 'Compreenda o funcionamento de circuitos retificadores.',
        category: 'componentes',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/aQD4',
        iosUrl: 'https://senaispace.senai.br/aQD4',
        icon: 'fas fa-wave-square',
        size: '345.0 kB',
        concepts: ['Retificação', 'Diodos', 'Conversão AC/DC']
    },
    
    // Proteção e Controle
    {
        id: 'H2FT',
        title: 'Disjuntores Termomagnéticos',
        description: 'Explore os dispositivos de proteção termomagnéticos.',
        category: 'protecao',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/H2FT',
        iosUrl: 'https://senaispace.senai.br/H2FT',
        icon: 'fas fa-shield-alt',
        size: '148.3 kB',
        concepts: ['Proteção elétrica', 'Sobrecarga', 'Curto-circuito']
    },
    {
        id: 'q1eE',
        title: 'Disjuntor-Motor',
        description: 'Analise disjuntores específicos para proteção de motores.',
        category: 'protecao',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/q1eE',
        iosUrl: 'https://senaispace.senai.br/q1eE',
        icon: 'fas fa-cog',
        size: '1.5 MB',
        concepts: ['Proteção de motores', 'Partida de motores', 'Controle industrial']
    },
    {
        id: 'rZEK',
        title: 'Filtro Capacitivo',
        description: 'Visualize o funcionamento de filtros capacitivos.',
        category: 'protecao',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/rZEK',
        iosUrl: 'https://senaispace.senai.br/rZEK',
        icon: 'fas fa-filter',
        size: '211.1 kB',
        concepts: ['Filtragem', 'Capacitores', 'Ripple']
    },
    
    // Instrumentação
    {
        id: 'NA47',
        title: 'Medição de Corrente',
        description: 'Aprenda técnicas de medição de corrente elétrica.',
        category: 'instrumentacao',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/NA47',
        iosUrl: 'https://senaispace.senai.br/NA47',
        icon: 'fas fa-tachometer-alt',
        size: '1.3 MB',
        concepts: ['Amperímetro', 'Medição', 'Instrumentos elétricos']
    },
    {
        id: 'xQtG',
        title: 'Sensor de Temperatura',
        description: 'Explore sensores de temperatura automotivos.',
        category: 'instrumentacao',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/xQtG',
        iosUrl: 'https://senaispace.senai.br/xQtG',
        icon: 'fas fa-thermometer-half',
        size: '2.0 MB',
        concepts: ['Sensores', 'Temperatura', 'Automotiva']
    },
    {
        id: 'pVME',
        title: 'Sensor Indutivo',
        description: 'Compreenda o funcionamento de sensores indutivos.',
        category: 'instrumentacao',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/pVME',
        iosUrl: 'https://senaispace.senai.br/pVME',
        icon: 'fas fa-search',
        size: '654.4 kB',
        concepts: ['Sensores indutivos', 'Proximidade', 'Automação']
    },
    
    // Motores e Máquinas
    {
        id: 'YY2W',
        title: 'Princípio de Funcionamento de Motor Elétrico',
        description: 'Visualize os princípios básicos dos motores elétricos.',
        category: 'motores',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/YY2W',
        iosUrl: 'https://senaispace.senai.br/YY2W',
        icon: 'fas fa-sync-alt',
        size: '1.2 MB',
        concepts: ['Motores elétricos', 'Campo magnético', 'Rotação']
    },
    {
        id: '2yPb',
        title: 'Motor Estrela e Triângulo',
        description: 'Explore as configurações estrela e triângulo em motores.',
        category: 'motores',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/2yPb',
        iosUrl: 'https://senaispace.senai.br/2yPb',
        icon: 'fas fa-star',
        size: '3.4 MB',
        concepts: ['Configuração estrela', 'Configuração triângulo', 'Partida de motores']
    },
    {
        id: 'DvjT',
        title: 'Motor Trifásico',
        description: 'Analise a estrutura e funcionamento de motores trifásicos.',
        category: 'motores',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/DvjT',
        iosUrl: 'https://senaispace.senai.br/DvjT',
        icon: 'fas fa-cogs',
        size: '899.1 kB',
        concepts: ['Motores trifásicos', 'Campo girante', 'Eficiência energética']
    },
    
    // Instalações Elétricas
    {
        id: 'TPa8',
        title: 'Montagem do Quadro de Distribuição',
        description: 'Aprenda sobre montagem de quadros de distribuição.',
        category: 'instalacoes',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/TPa8',
        iosUrl: 'https://senaispace.senai.br/TPa8',
        icon: 'fas fa-th-large',
        size: '3.2 MB',
        concepts: ['Quadros elétricos', 'Distribuição', 'Instalações prediais']
    },
    {
        id: 'xjWo',
        title: 'Sistema Elétrico de Potência',
        description: 'Visualize sistemas elétricos de potência.',
        category: 'instalacoes',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/xjWo',
        iosUrl: 'https://senaispace.senai.br/xjWo',
        icon: 'fas fa-industry',
        size: '1.0 MB',
        concepts: ['Sistemas de potência', 'Transmissão', 'Distribuição de energia']
    },
    {
        id: 'cPNW',
        title: 'Trecho de uma Instalação Elétrica',
        description: 'Explore trechos de instalações elétricas residenciais.',
        category: 'instalacoes',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/cPNW',
        iosUrl: 'https://senaispace.senai.br/cPNW',
        icon: 'fas fa-home',
        size: '3.4 MB',
        concepts: ['Instalações residenciais', 'Fiação', 'Normas técnicas']
    },
    
    // Materiais e Magnetismo
    {
        id: '1Xr2',
        title: 'Materiais Elétricos',
        description: 'Conheça as propriedades dos materiais elétricos.',
        category: 'materiais',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/1Xr2',
        iosUrl: 'https://senaispace.senai.br/1Xr2',
        icon: 'fas fa-cube',
        size: '1.9 MB',
        concepts: ['Condutores', 'Isolantes', 'Semicondutores']
    },
    {
        id: '14sc',
        title: 'Sentido do Campo Magnético',
        description: 'Visualize o sentido e direção de campos magnéticos.',
        category: 'materiais',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/14sc',
        iosUrl: 'https://senaispace.senai.br/14sc',
        icon: 'fas fa-compass',
        size: '419.4 kB',
        concepts: ['Campo magnético', 'Magnetismo', 'Regra da mão direita']
    },
    
    // Manutenção e Diagnóstico
    {
        id: 'vfjD',
        title: 'Resolver',
        description: 'Explore dispositivos resolver para controle de posição.',
        category: 'manutencao',
        level: 'avancado',
        androidUrl: 'https://senaispace.senai.br/vfjD',
        iosUrl: 'https://senaispace.senai.br/vfjD',
        icon: 'fas fa-crosshairs',
        size: '899.1 kB',
        concepts: ['Resolver', 'Controle de posição', 'Feedback']
    },
    {
        id: 'f1em',
        title: 'Condutor Rompido',
        description: 'Identifique e analise falhas em condutores elétricos.',
        category: 'manutencao',
        level: 'intermediario',
        androidUrl: 'https://senaispace.senai.br/f1em',
        iosUrl: 'https://senaispace.senai.br/f1em',
        icon: 'fas fa-exclamation-triangle',
        size: '2.2 MB',
        concepts: ['Falhas elétricas', 'Diagnóstico', 'Manutenção preventiva']
    },
    {
        id: 'yRo6',
        title: 'Teste Elementar',
        description: 'Aprenda procedimentos básicos de teste elétrico.',
        category: 'manutencao',
        level: 'basico',
        androidUrl: 'https://senaispace.senai.br/yRo6',
        iosUrl: 'https://senaispace.senai.br/yRo6',
        icon: 'fas fa-vial',
        size: '1.2 MB',
        concepts: ['Testes elétricos', 'Procedimentos', 'Segurança']
    }
];

// Base de conhecimento expandida para o chatbot
const knowledgeBase = {
    // Saudações
    'olá': 'Olá! Sou seu assistente virtual para circuitos elétricos e realidade aumentada. Como posso ajudar você hoje?',
    'oi': 'Oi! Estou aqui para ajudar com circuitos elétricos e recursos de RA. O que você gostaria de saber?',
    'bom dia': 'Bom dia! Como posso auxiliar você no aprendizado de circuitos elétricos hoje?',
    'boa tarde': 'Boa tarde! Estou pronto para ajudar com suas dúvidas sobre circuitos e RA.',
    'boa noite': 'Boa noite! Como posso ajudar você com circuitos elétricos?',
    
    // Comandos de RA
    '/ra': 'Aqui estão os recursos de Realidade Aumentada disponíveis. Use "/ra [nome]" para informações específicas sobre um recurso.',
    '/categoria': 'Categorias disponíveis: básicos, componentes, proteção, instrumentação, motores, instalações, materiais, manutenção.',
    '/como-usar': 'Para usar os recursos de RA: 1) Escaneie o QR Code ou clique no link, 2) Baixe o app, 3) Permita acesso à câmera, 4) Aponte para superfície plana, 5) Explore em 3D!',
    
    // Conceitos básicos
    'corrente': 'A corrente elétrica é o fluxo ordenado de cargas elétricas. Explore nosso recurso de RA "Corrente Elétrica" para visualizar este conceito em 3D!',
    'tensão': 'A tensão elétrica é a diferença de potencial entre dois pontos. É medida em volts (V).',
    'resistência': 'A resistência é a oposição ao fluxo de corrente elétrica. Veja nosso recurso de RA "Resistor" para entender melhor!',
    'potência': 'A potência elétrica é a taxa de conversão de energia elétrica. P = V × I (Potência = Tensão × Corrente).',
    
    // Lei de Ohm
    'lei de ohm': 'A Lei de Ohm estabelece que V = R × I, onde V é tensão, R é resistência e I é corrente.',
    'ohm': 'A Lei de Ohm é fundamental: Tensão = Resistência × Corrente (V = R × I).',
    
    // Tipos de circuitos
    'série': 'Em circuitos em série, os componentes são conectados sequencialmente. A corrente é igual em todos os pontos.',
    'paralelo': 'Em circuitos em paralelo, os componentes têm múltiplos caminhos. A tensão é igual em todos os ramos.',
    'misto': 'Circuitos mistos combinam elementos em série e paralelo. Analise cada parte separadamente.',
    
    // Componentes
    'resistor': 'Resistores limitam a corrente elétrica. Explore nosso recurso de RA "Resistor" para ver como funcionam!',
    'capacitor': 'Capacitores armazenam energia elétrica temporariamente. Veja o recurso "Filtro Capacitivo" em RA.',
    'indutor': 'Indutores armazenam energia em campo magnético. Relacionado ao recurso "Solenóide" em RA.',
    'diodo': 'Diodos permitem corrente em apenas uma direção. Veja "Circuito Retificador" em RA.',
    
    // Instrumentos
    'multímetro': 'O multímetro mede tensão, corrente e resistência. Essencial para análise de circuitos.',
    'amperímetro': 'Amperímetros medem corrente elétrica. Explore "Medição de Corrente" em RA!',
    'voltímetro': 'Voltímetros medem tensão elétrica entre dois pontos.',
    
    // Motores
    'motor': 'Motores convertem energia elétrica em mecânica. Veja nossos recursos de RA sobre motores!',
    'motor trifásico': 'Motores trifásicos são eficientes e amplamente usados na indústria. Explore em RA!',
    'estrela triângulo': 'Configurações de partida para motores trifásicos. Visualize em nosso recurso de RA!',
    
    // Proteção
    'disjuntor': 'Disjuntores protegem circuitos contra sobrecarga e curto-circuito. Veja em RA!',
    'fusível': 'Fusíveis são dispositivos de proteção que se rompem com excesso de corrente.',
    
    // Instalações
    'quadro elétrico': 'Quadros distribuem energia elétrica. Explore "Montagem do Quadro de Distribuição" em RA!',
    'instalação': 'Instalações elétricas seguem normas técnicas. Veja "Trecho de Instalação Elétrica" em RA.',
    
    // Realidade Aumentada
    'realidade aumentada': 'A RA permite visualizar componentes elétricos em 3D. Temos 24 recursos disponíveis!',
    'ra': 'Realidade Aumentada: tecnologia que sobrepõe objetos virtuais ao mundo real. Perfeita para educação!',
    'senai space': 'SENAI Space oferece recursos educacionais de RA para área técnica.',
    'qr code': 'QR Codes facilitam o acesso aos aplicativos de RA. Escaneie com seu smartphone!',
    
    // Ajuda
    'ajuda': 'Posso ajudar com: conceitos de circuitos, componentes elétricos, recursos de RA, simulações PHET. O que você precisa?',
    'comandos': 'Comandos disponíveis: /ra, /categoria [nome], /como-usar, /relacionados [conceito]',
    
    // Despedidas
    'tchau': 'Tchau! Continue explorando os recursos de circuitos e RA. Até a próxima!',
    'obrigado': 'De nada! Estou sempre aqui para ajudar com circuitos elétricos e RA.',
    'valeu': 'Por nada! Continue aprendendo com nossas simulações e recursos de RA!'
};

// Categorias para organização
const categories = {
    'basicos': {
        name: 'Conceitos Básicos',
        icon: 'fas fa-graduation-cap',
        color: '#10b981'
    },
    'componentes': {
        name: 'Componentes Eletrônicos',
        icon: 'fas fa-microchip',
        color: '#3b82f6'
    },
    'protecao': {
        name: 'Proteção e Controle',
        icon: 'fas fa-shield-alt',
        color: '#f59e0b'
    },
    'instrumentacao': {
        name: 'Instrumentação',
        icon: 'fas fa-tachometer-alt',
        color: '#8b5cf6'
    },
    'motores': {
        name: 'Motores e Máquinas',
        icon: 'fas fa-cogs',
        color: '#ef4444'
    },
    'instalacoes': {
        name: 'Instalações Elétricas',
        icon: 'fas fa-home',
        color: '#06b6d4'
    },
    'materiais': {
        name: 'Materiais e Magnetismo',
        icon: 'fas fa-cube',
        color: '#84cc16'
    },
    'manutencao': {
        name: 'Manutenção e Diagnóstico',
        icon: 'fas fa-tools',
        color: '#f97316'
    }
};

// Parâmetros de simulação (código original)
const circuitParams = {
    serie: {
        url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_pt_BR.html",
        instructions: [
            "Arraste uma fonte de tensão CA para a área de trabalho",
            "Adicione resistores, capacitores ou indutores em sequência",
            "Conecte todos os componentes em um único caminho",
            "Use o multímetro para medir a corrente e a tensão em diferentes pontos",
            "Observe a defasagem entre tensão e corrente em capacitores e indutores"
        ]
    },
    paralelo: {
        url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_pt_BR.html",
        instructions: [
            "Arraste uma fonte de tensão CA para a área de trabalho",
            "Adicione resistores em ramos paralelos",
            "Conecte cada componente em ramos separados",
            "Meça a corrente em cada ramo com o amperímetro",
            "Verifique que a tensão é igual em todos os ramos"
        ]
    },
    misto: {
        url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_pt_BR.html",
        instructions: [
            "Arraste uma fonte de tensão CA para a área de trabalho",
            "Combine resistores em série e paralelo",
            "Identifique as partes em série e em paralelo",
            "Calcule a resistência equivalente por partes",
            "Meça e compare com os valores calculados"
        ]
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeARResources();
    initializeChatbot();
    initializeSimulations();
    initializeFilters();
});

// Função para inicializar recursos de RA
function initializeARResources() {
    const container = document.getElementById('arResourcesContainer');
    if (!container) return;
    
    renderARResources(arResources);
}

// Função para renderizar recursos de RA
function renderARResources(resources) {
    const container = document.getElementById('arResourcesContainer');
    container.innerHTML = '';
    
    resources.forEach(resource => {
        const card = createARCard(resource);
        container.appendChild(card);
    });
}

// Função para criar card de recurso de RA
function createARCard(resource) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const category = categories[resource.category];
    
    col.innerHTML = `
        <div class="ar-card" data-category="${resource.category}" data-level="${resource.level}">
            <div class="ar-card-header">
                <div class="ar-icon">
                    <i class="${resource.icon}"></i>
                </div>
                <div>
                    <h5 class="mb-1">${resource.title}</h5>
                    <span class="ar-category-badge">${category.name}</span>
                    <span class="ar-level-badge ${resource.level}">${resource.level}</span>
                </div>
            </div>
            
            <p class="text-muted mb-3">${resource.description}</p>
            
            <div class="qr-code-container">
                <canvas id="qr-${resource.id}" class="qr-code"></canvas>
                <small class="text-muted">Escaneie para acessar</small>
            </div>
            
            <div class="download-buttons">
                <a href="${resource.androidUrl}" target="_blank" class="btn btn-android btn-sm">
                    <i class="fab fa-android me-1"></i>Android
                </a>
                <a href="${resource.iosUrl}" target="_blank" class="btn btn-ios btn-sm">
                    <i class="fab fa-apple me-1"></i>iOS
                </a>
            </div>
            
            <div class="mt-3">
                <small class="text-muted">
                    <i class="fas fa-download me-1"></i>Tamanho: ${resource.size}
                </small>
                <button class="btn btn-link btn-sm float-end" onclick="showARDetails('${resource.id}')">
                    <i class="fas fa-info-circle"></i> Detalhes
                </button>
            </div>
        </div>
    `;
    
    // Gerar QR Code
    setTimeout(() => {
        generateQRCode(resource.id, resource.androidUrl);
    }, 100);
    
    return col;
}

// Função para gerar QR Code
function generateQRCode(resourceId, url) {
    const canvas = document.getElementById(`qr-${resourceId}`);
    if (canvas && typeof QRCode !== 'undefined') {
        QRCode.toCanvas(canvas, url, {
            width: 120,
            height: 120,
            margin: 1
        });
    }
}

// Função para mostrar detalhes do recurso de RA
function showARDetails(resourceId) {
    const resource = arResources.find(r => r.id === resourceId);
    if (!resource) return;
    
    const modal = document.getElementById('arResourceModal');
    const modalTitle = document.getElementById('arResourceModalLabel');
    const modalBody = document.getElementById('arResourceModalBody');
    
    modalTitle.textContent = resource.title;
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <div class="ar-icon mb-3" style="width: 80px; height: 80px; font-size: 2rem;">
                    <i class="${resource.icon}"></i>
                </div>
                <canvas id="modal-qr-${resource.id}" style="max-width: 150px;"></canvas>
            </div>
            <div class="col-md-8">
                <h6>Descrição</h6>
                <p>${resource.description}</p>
                
                <h6>Conceitos Abordados</h6>
                <ul>
                    ${resource.concepts.map(concept => `<li>${concept}</li>`).join('')}
                </ul>
                
                <h6>Informações Técnicas</h6>
                <ul class="list-unstyled">
                    <li><strong>Categoria:</strong> ${categories[resource.category].name}</li>
                    <li><strong>Nível:</strong> ${resource.level}</li>
                    <li><strong>Tamanho:</strong> ${resource.size}</li>
                </ul>
                
                <div class="mt-3">
                    <a href="${resource.androidUrl}" target="_blank" class="btn btn-android me-2">
                        <i class="fab fa-android me-1"></i>Baixar para Android
                    </a>
                    <a href="${resource.iosUrl}" target="_blank" class="btn btn-ios">
                        <i class="fab fa-apple me-1"></i>Baixar para iOS
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Gerar QR Code no modal
    setTimeout(() => {
        generateQRCode(`modal-${resource.id}`, resource.androidUrl);
    }, 100);
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Função para inicializar filtros
function initializeFilters() {
    const searchInput = document.getElementById('searchAR');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterARResources);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterARResources);
    }
    
    if (levelFilter) {
        levelFilter.addEventListener('change', filterARResources);
    }
}

// Função para filtrar recursos de RA
function filterARResources() {
    const searchTerm = document.getElementById('searchAR')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const levelFilter = document.getElementById('levelFilter')?.value || '';
    
    const filteredResources = arResources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm) ||
                            resource.description.toLowerCase().includes(searchTerm) ||
                            resource.concepts.some(concept => concept.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !categoryFilter || resource.category === categoryFilter;
        const matchesLevel = !levelFilter || resource.level === levelFilter;
        
        return matchesSearch && matchesCategory && matchesLevel;
    });
    
    renderARResources(filteredResources);
}

// Função para inicializar chatbot (código original expandido)
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        sendButton.addEventListener('click', sendMessage);
    }
}

// Função para enviar mensagem do chatbot (expandida)
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Processar resposta
    setTimeout(() => {
        const response = processMessage(message);
        addMessage(response, 'bot');
    }, 500);
}

// Função para processar mensagem (expandida)
function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Comandos especiais de RA
    if (lowerMessage.startsWith('/ra ')) {
        const resourceName = lowerMessage.substring(4);
        return getARResourceInfo(resourceName);
    }
    
    if (lowerMessage.startsWith('/categoria ')) {
        const categoryName = lowerMessage.substring(11);
        return getCategoryResources(categoryName);
    }
    
    if (lowerMessage.startsWith('/relacionados ')) {
        const concept = lowerMessage.substring(13);
        return getRelatedResources(concept);
    }
    
    // Buscar na base de conhecimento
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    
    // Resposta padrão
    return 'Desculpe, não entendi sua pergunta. Posso ajudar com conceitos de circuitos elétricos, componentes, recursos de RA, ou simulações PHET. Tente perguntar sobre "corrente", "resistor", "realidade aumentada" ou use comandos como "/ra" ou "/como-usar".';
}

// Função para obter informações de recurso de RA
function getARResourceInfo(resourceName) {
    const resource = arResources.find(r => 
        r.title.toLowerCase().includes(resourceName) ||
        r.id.toLowerCase() === resourceName
    );
    
    if (resource) {
        return `📱 **${resource.title}**\n\n${resource.description}\n\n🎯 **Conceitos:** ${resource.concepts.join(', ')}\n📊 **Nível:** ${resource.level}\n💾 **Tamanho:** ${resource.size}\n\nEscaneie o QR Code na seção de RA ou clique nos links para baixar!`;
    }
    
    return 'Recurso não encontrado. Use "/ra" para ver todos os recursos disponíveis.';
}

// Função para obter recursos por categoria
function getCategoryResources(categoryName) {
    const categoryKey = Object.keys(categories).find(key => 
        categories[key].name.toLowerCase().includes(categoryName) ||
        key === categoryName
    );
    
    if (categoryKey) {
        const categoryResources = arResources.filter(r => r.category === categoryKey);
        const resourceList = categoryResources.map(r => `• ${r.title}`).join('\n');
        
        return `📂 **${categories[categoryKey].name}**\n\nRecursos disponíveis:\n${resourceList}\n\nUse "/ra [nome]" para mais detalhes sobre um recurso específico.`;
    }
    
    return 'Categoria não encontrada. Categorias disponíveis: básicos, componentes, proteção, instrumentação, motores, instalações, materiais, manutenção.';
}

// Função para obter recursos relacionados
function getRelatedResources(concept) {
    const relatedResources = arResources.filter(r => 
        r.concepts.some(c => c.toLowerCase().includes(concept)) ||
        r.title.toLowerCase().includes(concept) ||
        r.description.toLowerCase().includes(concept)
    );
    
    if (relatedResources.length > 0) {
        const resourceList = relatedResources.map(r => `• ${r.title} (${categories[r.category].name})`).join('\n');
        return `🔗 **Recursos relacionados a "${concept}":**\n\n${resourceList}\n\nUse "/ra [nome]" para mais detalhes!`;
    }
    
    return `Não encontrei recursos relacionados a "${concept}". Tente termos como "motor", "resistor", "corrente", "sensor", etc.`;
}

// Função para adicionar mensagem ao chat
function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message fade-in`;
    
    const icon = sender === 'bot' ? '<i class="fas fa-robot me-2"></i>' : '<i class="fas fa-user me-2"></i>';
    messageDiv.innerHTML = `${icon}${message.replace(/\n/g, '<br>')}`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para inicializar simulações (código original)
function initializeSimulations() {
    const circuitSelect = document.getElementById('circuitType');
    
    if (circuitSelect) {
        circuitSelect.addEventListener('change', function() {
            updateSimulation(this.value);
        });
    }
}

// Função para atualizar simulação (código original)
function updateSimulation(circuitType) {
    const iframe = document.getElementById('phetSimulation');
    const instructionsList = document.getElementById('instructionsList');
    
    if (iframe && circuitParams[circuitType]) {
        iframe.src = circuitParams[circuitType].url;
    }
    
    if (instructionsList && circuitParams[circuitType]) {
        instructionsList.innerHTML = circuitParams[circuitType].instructions
            .map(instruction => `<li>${instruction}</li>`)
            .join('');
    }
}

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Atualizar link ativo na navegação
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

