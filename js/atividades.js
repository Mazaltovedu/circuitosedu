/**
 * Script para organização sequencial das atividades
 * Implementa um sistema de progressão estruturada no aprendizado
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Sistema de progresso do usuário
    let progressoUsuario = {
        moduloAtual: 1,
        atividadesCompletas: [],
        pontuacaoTotal: 0,
        tempoEstudo: 0
    };

    // Carregar progresso do localStorage
    if (localStorage.getItem('circuitosEduProgresso')) {
        progressoUsuario = JSON.parse(localStorage.getItem('circuitosEduProgresso'));
    }

    // Estrutura dos módulos e atividades
    const estruturaModulos = {
        1: {
            titulo: 'Fundamentos de CA',
            descricao: 'Introdução à corrente alternada, conceitos básicos de tensão, corrente e frequência.',
            prerequisitos: [],
            atividades: [
                {
                    id: 'teoria-ca-basico',
                    tipo: 'teoria',
                    titulo: 'Material Teórico: Introdução à CA',
                    url: 'index.html#material',
                    pontos: 10,
                    tempoEstimado: 15
                },
                {
                    id: 'mapa-ca-basico',
                    tipo: 'mapa',
                    titulo: 'Mapa Conceitual: Circuitos CA Básicos',
                    url: 'mapas-conceituais.html',
                    pontos: 15,
                    tempoEstimado: 10
                },
                {
                    id: 'quiz-fundamentos',
                    tipo: 'quiz',
                    titulo: 'Quiz: Fundamentos de CA',
                    url: 'quizzes.html',
                    pontos: 20,
                    tempoEstimado: 10
                }
            ]
        },
        2: {
            titulo: 'Componentes Passivos em CA',
            descricao: 'Estudo detalhado de resistores, indutores e capacitores em circuitos CA.',
            prerequisitos: [1],
            atividades: [
                {
                    id: 'teoria-componentes',
                    tipo: 'teoria',
                    titulo: 'Material Teórico: Componentes Passivos',
                    url: 'index.html#material',
                    pontos: 15,
                    tempoEstimado: 20
                },
                {
                    id: 'mapa-componentes',
                    tipo: 'mapa',
                    titulo: 'Mapa Conceitual: Componentes Passivos em CA',
                    url: 'mapas-conceituais.html',
                    pontos: 15,
                    tempoEstimado: 15
                },
                {
                    id: 'quiz-componentes',
                    tipo: 'quiz',
                    titulo: 'Quiz: Componentes Passivos',
                    url: 'quizzes.html',
                    pontos: 25,
                    tempoEstimado: 15
                }
            ]
        },
        3: {
            titulo: 'Análise de Circuitos CA',
            descricao: 'Análise de circuitos em série, paralelo e mistos, incluindo impedância e fasores.',
            prerequisitos: [1, 2],
            atividades: [
                {
                    id: 'teoria-analise',
                    tipo: 'teoria',
                    titulo: 'Material Teórico: Circuitos em Série, Paralelo e Misto',
                    url: 'index.html#material',
                    pontos: 20,
                    tempoEstimado: 25
                },
                {
                    id: 'simulacao-phet',
                    tipo: 'simulacao',
                    titulo: 'Simulações PHET',
                    url: 'index.html#simulacoes',
                    pontos: 30,
                    tempoEstimado: 30
                },
                {
                    id: 'quiz-analise',
                    tipo: 'quiz',
                    titulo: 'Quiz: Análise de Circuitos CA',
                    url: 'quizzes.html',
                    pontos: 35,
                    tempoEstimado: 20
                }
            ]
        }
    };

    // Função para verificar se um módulo está desbloqueado
    function moduloDesbloqueado(numeroModulo) {
        const modulo = estruturaModulos[numeroModulo];
        if (!modulo || !modulo.prerequisitos) return true;
        
        return modulo.prerequisitos.every(prereq => {
            const atividadesPrereq = estruturaModulos[prereq].atividades;
            return atividadesPrereq.every(atividade => 
                progressoUsuario.atividadesCompletas.includes(atividade.id)
            );
        });
    }

    // Função para verificar se uma atividade está desbloqueada
    function atividadeDesbloqueada(numeroModulo, atividadeId) {
        if (!moduloDesbloqueado(numeroModulo)) return false;
        
        const atividades = estruturaModulos[numeroModulo].atividades;
        const indiceAtividade = atividades.findIndex(a => a.id === atividadeId);
        
        // Primeira atividade do módulo sempre desbloqueada (se módulo desbloqueado)
        if (indiceAtividade === 0) return true;
        
        // Verificar se atividade anterior foi completada
        const atividadeAnterior = atividades[indiceAtividade - 1];
        return progressoUsuario.atividadesCompletas.includes(atividadeAnterior.id);
    }

    // Função para marcar atividade como completa
    function completarAtividade(atividadeId) {
        if (!progressoUsuario.atividadesCompletas.includes(atividadeId)) {
            progressoUsuario.atividadesCompletas.push(atividadeId);
            
            // Encontrar atividade e adicionar pontos
            for (let numeroModulo in estruturaModulos) {
                const atividade = estruturaModulos[numeroModulo].atividades.find(a => a.id === atividadeId);
                if (atividade) {
                    progressoUsuario.pontuacaoTotal += atividade.pontos;
                    progressoUsuario.tempoEstudo += atividade.tempoEstimado;
                    break;
                }
            }
            
            salvarProgresso();
            atualizarInterface();
            mostrarParabens(atividadeId);
        }
    }

    // Função para salvar progresso no localStorage
    function salvarProgresso() {
        localStorage.setItem('circuitosEduProgresso', JSON.stringify(progressoUsuario));
    }

    // Função para calcular progresso geral
    function calcularProgressoGeral() {
        const totalAtividades = Object.values(estruturaModulos)
            .reduce((total, modulo) => total + modulo.atividades.length, 0);
        return Math.round((progressoUsuario.atividadesCompletas.length / totalAtividades) * 100);
    }

    // Função para atualizar a interface
    function atualizarInterface() {
        const progressoGeral = calcularProgressoGeral();
        
        // Atualizar barra de progresso geral
        const barraProgresso = document.getElementById('progresso-geral');
        if (barraProgresso) {
            barraProgresso.style.width = progressoGeral + '%';
            barraProgresso.textContent = progressoGeral + '%';
        }

        // Atualizar estatísticas
        const estatisticas = document.getElementById('estatisticas-usuario');
        if (estatisticas) {
            estatisticas.innerHTML = `
                <div class="row text-center">
                    <div class="col-md-3">
                        <h4>${progressoUsuario.atividadesCompletas.length}</h4>
                        <small>Atividades Completas</small>
                    </div>
                    <div class="col-md-3">
                        <h4>${progressoUsuario.pontuacaoTotal}</h4>
                        <small>Pontos Totais</small>
                    </div>
                    <div class="col-md-3">
                        <h4>${progressoUsuario.tempoEstudo}</h4>
                        <small>Minutos de Estudo</small>
                    </div>
                    <div class="col-md-3">
                        <h4>${progressoGeral}%</h4>
                        <small>Progresso Geral</small>
                    </div>
                </div>
            `;
        }

        // Atualizar cards dos módulos
        Object.keys(estruturaModulos).forEach(numeroModulo => {
            atualizarCardModulo(numeroModulo);
        });
    }

    // Função para atualizar card de um módulo
    function atualizarCardModulo(numeroModulo) {
        const modulo = estruturaModulos[numeroModulo];
        const desbloqueado = moduloDesbloqueado(numeroModulo);
        const card = document.getElementById(`modulo-${numeroModulo}`);
        
        if (!card) return;

        // Calcular progresso do módulo
        const atividadesCompletas = modulo.atividades.filter(a => 
            progressoUsuario.atividadesCompletas.includes(a.id)
        ).length;
        const progressoModulo = Math.round((atividadesCompletas / modulo.atividades.length) * 100);

        // Atualizar aparência do card
        if (!desbloqueado) {
            card.classList.add('opacity-50');
            card.querySelector('.card-body').innerHTML += '<div class="badge bg-warning">Bloqueado</div>';
        } else {
            card.classList.remove('opacity-50');
        }

        // Adicionar barra de progresso do módulo
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = progressoModulo + '%';
            progressBar.textContent = progressoModulo + '%';
        }

        // Atualizar links das atividades
        const atividades = card.querySelectorAll('.atividade-link');
        atividades.forEach((link, index) => {
            const atividade = modulo.atividades[index];
            if (atividade) {
                const atividadeCompleta = progressoUsuario.atividadesCompletas.includes(atividade.id);
                const atividadeDesbloq = atividadeDesbloqueada(numeroModulo, atividade.id);
                
                if (atividadeCompleta) {
                    link.innerHTML += ' <i class="fas fa-check-circle text-success"></i>';
                } else if (!atividadeDesbloq) {
                    link.classList.add('text-muted');
                    link.style.pointerEvents = 'none';
                    link.innerHTML += ' <i class="fas fa-lock text-warning"></i>';
                }
                
                // Adicionar evento de clique para marcar como completa
                if (atividadeDesbloq && !atividadeCompleta) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        completarAtividade(atividade.id);
                        window.open(atividade.url, '_blank');
                    });
                }
            }
        });
    }

    // Função para mostrar parabéns
    function mostrarParabens(atividadeId) {
        // Encontrar atividade
        let atividade = null;
        for (let numeroModulo in estruturaModulos) {
            atividade = estruturaModulos[numeroModulo].atividades.find(a => a.id === atividadeId);
            if (atividade) break;
        }
        
        if (!atividade) return;

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
            padding: 30px;
            border-radius: 8px;
            max-width: 400px;
            text-align: center;
        `;

        conteudo.innerHTML = `
            <i class="fas fa-trophy text-warning" style="font-size: 3rem;"></i>
            <h4 class="mt-3">Parabéns!</h4>
            <p>Você completou: <strong>${atividade.titulo}</strong></p>
            <p>Pontos ganhos: <span class="badge bg-success">+${atividade.pontos}</span></p>
            <button class="btn btn-primary" onclick="this.closest('.modal-parabens').remove()">Continuar</button>
        `;

        modal.className = 'modal-parabens';
        modal.appendChild(conteudo);
        document.body.appendChild(modal);

        // Fechar automaticamente após 3 segundos
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 3000);
    }

    // Função para resetar progresso (para desenvolvimento/teste)
    function resetarProgresso() {
        if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
            localStorage.removeItem('circuitosEduProgresso');
            location.reload();
        }
    }

    // Expor funções globalmente para uso em botões
    window.completarAtividade = completarAtividade;
    window.resetarProgresso = resetarProgresso;

    // Inicializar interface
    atualizarInterface();
});

