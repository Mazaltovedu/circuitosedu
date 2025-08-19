/**
 * Script para mapas conceituais interativos
 * Utiliza SVG para criar mapas conceituais dinâmicos sobre circuitos elétricos
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Dados dos mapas conceituais
    const mapasConceituais = {
        'ca-basico': {
            titulo: 'Circuitos CA Básicos',
            conceitos: [
                { id: 'ca', texto: 'Corrente Alternada (CA)', x: 400, y: 50, cor: '#007bff' },
                { id: 'tensao', texto: 'Tensão CA', x: 200, y: 150, cor: '#28a745' },
                { id: 'corrente', texto: 'Corrente CA', x: 600, y: 150, cor: '#28a745' },
                { id: 'frequencia', texto: 'Frequência (Hz)', x: 100, y: 250, cor: '#ffc107' },
                { id: 'amplitude', texto: 'Amplitude', x: 300, y: 250, cor: '#ffc107' },
                { id: 'fase', texto: 'Fase (φ)', x: 500, y: 250, cor: '#ffc107' },
                { id: 'periodo', texto: 'Período (T)', x: 700, y: 250, cor: '#ffc107' },
                { id: 'senoidal', texto: 'Forma Senoidal', x: 400, y: 350, cor: '#dc3545' }
            ],
            conexoes: [
                { origem: 'ca', destino: 'tensao' },
                { origem: 'ca', destino: 'corrente' },
                { origem: 'tensao', destino: 'frequencia' },
                { origem: 'tensao', destino: 'amplitude' },
                { origem: 'corrente', destino: 'fase' },
                { origem: 'corrente', destino: 'periodo' },
                { origem: 'frequencia', destino: 'senoidal' },
                { origem: 'amplitude', destino: 'senoidal' },
                { origem: 'fase', destino: 'senoidal' },
                { origem: 'periodo', destino: 'senoidal' }
            ]
        },
        'componentes-passivos': {
            titulo: 'Componentes Passivos em CA',
            conceitos: [
                { id: 'componentes', texto: 'Componentes Passivos', x: 400, y: 50, cor: '#007bff' },
                { id: 'resistor', texto: 'Resistor (R)', x: 150, y: 150, cor: '#28a745' },
                { id: 'indutor', texto: 'Indutor (L)', x: 400, y: 150, cor: '#28a745' },
                { id: 'capacitor', texto: 'Capacitor (C)', x: 650, y: 150, cor: '#28a745' },
                { id: 'resistencia', texto: 'Resistência', x: 50, y: 250, cor: '#ffc107' },
                { id: 'reatancia-l', texto: 'Reatância Indutiva (XL)', x: 300, y: 250, cor: '#ffc107' },
                { id: 'reatancia-c', texto: 'Reatância Capacitiva (XC)', x: 550, y: 250, cor: '#ffc107' },
                { id: 'impedancia', texto: 'Impedância (Z)', x: 400, y: 350, cor: '#dc3545' },
                { id: 'fasores', texto: 'Representação Fasorial', x: 200, y: 450, cor: '#6f42c1' },
                { id: 'potencia', texto: 'Potência em CA', x: 600, y: 450, cor: '#6f42c1' }
            ],
            conexoes: [
                { origem: 'componentes', destino: 'resistor' },
                { origem: 'componentes', destino: 'indutor' },
                { origem: 'componentes', destino: 'capacitor' },
                { origem: 'resistor', destino: 'resistencia' },
                { origem: 'indutor', destino: 'reatancia-l' },
                { origem: 'capacitor', destino: 'reatancia-c' },
                { origem: 'resistencia', destino: 'impedancia' },
                { origem: 'reatancia-l', destino: 'impedancia' },
                { origem: 'reatancia-c', destino: 'impedancia' },
                { origem: 'impedancia', destino: 'fasores' },
                { origem: 'impedancia', destino: 'potencia' }
            ]
        }
    };

    // Função para criar um mapa conceitual SVG
    function criarMapaConceitual(containerId, mapaId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const mapa = mapasConceituais[mapaId];
        if (!mapa) return;

        // Criar SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '800');
        svg.setAttribute('height', '500');
        svg.setAttribute('viewBox', '0 0 800 500');
        svg.style.border = '1px solid #ddd';
        svg.style.borderRadius = '8px';
        svg.style.backgroundColor = '#f8f9fa';

        // Adicionar título
        const titulo = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        titulo.setAttribute('x', '400');
        titulo.setAttribute('y', '25');
        titulo.setAttribute('text-anchor', 'middle');
        titulo.setAttribute('font-size', '18');
        titulo.setAttribute('font-weight', 'bold');
        titulo.setAttribute('fill', '#333');
        titulo.textContent = mapa.titulo;
        svg.appendChild(titulo);

        // Adicionar conexões (linhas)
        mapa.conexoes.forEach(conexao => {
            const origem = mapa.conceitos.find(c => c.id === conexao.origem);
            const destino = mapa.conceitos.find(c => c.id === conexao.destino);
            
            if (origem && destino) {
                const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                linha.setAttribute('x1', origem.x);
                linha.setAttribute('y1', origem.y);
                linha.setAttribute('x2', destino.x);
                linha.setAttribute('y2', destino.y);
                linha.setAttribute('stroke', '#6c757d');
                linha.setAttribute('stroke-width', '2');
                linha.setAttribute('opacity', '0.7');
                svg.appendChild(linha);
            }
        });

        // Adicionar conceitos (círculos e texto)
        mapa.conceitos.forEach(conceito => {
            // Grupo para o conceito
            const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            grupo.setAttribute('class', 'conceito-grupo');
            grupo.style.cursor = 'pointer';

            // Círculo
            const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circulo.setAttribute('cx', conceito.x);
            circulo.setAttribute('cy', conceito.y);
            circulo.setAttribute('r', '40');
            circulo.setAttribute('fill', conceito.cor);
            circulo.setAttribute('stroke', '#fff');
            circulo.setAttribute('stroke-width', '3');
            circulo.setAttribute('opacity', '0.8');

            // Texto
            const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            texto.setAttribute('x', conceito.x);
            texto.setAttribute('y', conceito.y + 5);
            texto.setAttribute('text-anchor', 'middle');
            texto.setAttribute('font-size', '12');
            texto.setAttribute('font-weight', 'bold');
            texto.setAttribute('fill', '#fff');
            
            // Quebrar texto em múltiplas linhas se necessário
            const palavras = conceito.texto.split(' ');
            if (palavras.length > 2) {
                const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan1.setAttribute('x', conceito.x);
                tspan1.setAttribute('dy', '-6');
                tspan1.textContent = palavras.slice(0, 2).join(' ');
                
                const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan2.setAttribute('x', conceito.x);
                tspan2.setAttribute('dy', '12');
                tspan2.textContent = palavras.slice(2).join(' ');
                
                texto.appendChild(tspan1);
                texto.appendChild(tspan2);
            } else {
                texto.textContent = conceito.texto;
            }

            // Adicionar interatividade
            grupo.addEventListener('mouseenter', function() {
                circulo.setAttribute('opacity', '1');
                circulo.setAttribute('r', '45');
            });

            grupo.addEventListener('mouseleave', function() {
                circulo.setAttribute('opacity', '0.8');
                circulo.setAttribute('r', '40');
            });

            grupo.addEventListener('click', function() {
                mostrarInfoConceito(conceito);
            });

            grupo.appendChild(circulo);
            grupo.appendChild(texto);
            svg.appendChild(grupo);
        });

        container.appendChild(svg);
    }

    // Função para mostrar informações sobre um conceito
    function mostrarInfoConceito(conceito) {
        const infoConceitos = {
            'ca': 'Corrente Alternada é um tipo de corrente elétrica que muda de direção periodicamente.',
            'tensao': 'Tensão CA varia senoidalmente com o tempo, alternando entre valores positivos e negativos.',
            'corrente': 'Corrente CA flui em direções alternadas, seguindo a variação da tensão.',
            'frequencia': 'Frequência é o número de ciclos completos por segundo, medida em Hertz (Hz).',
            'resistor': 'Resistor oferece resistência constante ao fluxo de corrente, independente da frequência.',
            'indutor': 'Indutor se opõe a mudanças na corrente, criando reatância indutiva.',
            'capacitor': 'Capacitor se opõe a mudanças na tensão, criando reatância capacitiva.',
            'impedancia': 'Impedância é a oposição total ao fluxo de corrente CA, combinando resistência e reatância.'
        };

        const info = infoConceitos[conceito.id] || 'Informação não disponível.';
        
        // Criar modal simples
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        const conteudo = document.createElement('div');
        conteudo.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            text-align: center;
        `;

        conteudo.innerHTML = `
            <h5>${conceito.texto}</h5>
            <p>${info}</p>
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Fechar</button>
        `;

        modal.className = 'modal';
        modal.appendChild(conteudo);
        document.body.appendChild(modal);

        // Fechar ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Inicializar mapas conceituais
    criarMapaConceitual('mapa-ca-basico', 'ca-basico');
    criarMapaConceitual('mapa-componentes-passivos', 'componentes-passivos');
});

