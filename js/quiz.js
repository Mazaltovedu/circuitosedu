document.addEventListener("DOMContentLoaded", function() {
    const quizQuestion = document.getElementById("quiz-question");
    const quizOptions = document.getElementById("quiz-options");
    const submitAnswerBtn = document.getElementById("submit-answer");
    const quizFeedback = document.getElementById("quiz-feedback");
    const nextQuestionBtn = document.getElementById("next-question");

    let currentQuestionIndex = 0;
    let score = 0;
    let currentQuizSet = [];

    // Inicializa o quiz com questões do nível básico
    function initializeQuiz() {
        currentQuizSet = getQuestionsForCurrentLevel();
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= currentQuizSet.length) {
            // Adapta dificuldade e reinicia com novas questões se necessário
            adaptDifficulty();
            currentQuizSet = getQuestionsForCurrentLevel();
            currentQuestionIndex = 0;
        }

        const currentQuiz = currentQuizSet[currentQuestionIndex];
        quizQuestion.textContent = currentQuiz.question;
        quizOptions.innerHTML = "";
        
        // Mostra o nível atual
        const levelIndicator = document.createElement('div');
        levelIndicator.className = 'badge bg-secondary mb-3';
        levelIndicator.textContent = `Nível: ${userPerformance.difficulty.charAt(0).toUpperCase() + userPerformance.difficulty.slice(1)}`;
        quizQuestion.parentNode.insertBefore(levelIndicator, quizQuestion);
        
        currentQuiz.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("list-group-item", "list-group-item-action");
            button.addEventListener("click", () => {
                // Remove seleção anterior
                Array.from(quizOptions.children).forEach(btn => btn.classList.remove("active"));
                // Adiciona seleção atual
                button.classList.add("active");
            });
            quizOptions.appendChild(button);
        });
        quizFeedback.textContent = "";
        submitAnswerBtn.style.display = "block";
        nextQuestionBtn.style.display = "none";
    }

    function checkAnswer() {
        const selectedOption = quizOptions.querySelector(".list-group-item.active");
        if (!selectedOption) {
            quizFeedback.textContent = "Por favor, selecione uma opção.";
            quizFeedback.className = "mt-3 text-warning";
            return;
        }

        const userAnswer = selectedOption.textContent;
        const correctAnswer = currentQuizSet[currentQuestionIndex].answer;
        const isCorrect = userAnswer === correctAnswer;

        // Atualiza estatísticas do usuário
        userPerformance.totalAnswers++;
        if (isCorrect) {
            userPerformance.correctAnswers++;
            score++;
        }

        // Feedback personalizado
        const feedback = getPersonalizedFeedback(isCorrect, currentQuizSet[currentQuestionIndex].question);
        
        if (isCorrect) {
            quizFeedback.innerHTML = `<strong>Correto!</strong> 🎉<br>${feedback}`;
            quizFeedback.className = "mt-3 text-success";
        } else {
            quizFeedback.innerHTML = `<strong>Incorreto.</strong><br>A resposta correta é: <em>${correctAnswer}</em><br><br><strong>Explicação:</strong> ${feedback}`;
            quizFeedback.className = "mt-3 text-danger";
        }
        
        submitAnswerBtn.style.display = "none";
        nextQuestionBtn.style.display = "block";

        // Desabilita botões de opção após a resposta
        Array.from(quizOptions.children).forEach(btn => btn.disabled = true);
    }

    function nextQuestion() {
        // Remove indicador de nível anterior
        const levelIndicator = document.querySelector('.badge.bg-secondary');
        if (levelIndicator) {
            levelIndicator.remove();
        }
        
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuizSet.length) {
            loadQuestion();
            // Reabilita botões de opção para a nova pergunta
            Array.from(quizOptions.children).forEach(btn => btn.disabled = false);
        } else {
            // Verifica se deve adaptar dificuldade
            adaptDifficulty();
            
            quizQuestion.textContent = `Quiz Concluído! Sua pontuação: ${score} de ${userPerformance.totalAnswers}`;
            quizOptions.innerHTML = `
                <div class="text-center">
                    <p>Performance geral: ${Math.round((userPerformance.correctAnswers / userPerformance.totalAnswers) * 100)}%</p>
                    <p>Nível atual: ${userPerformance.difficulty.charAt(0).toUpperCase() + userPerformance.difficulty.slice(1)}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Reiniciar Quiz</button>
                </div>
            `;
            submitAnswerBtn.style.display = "none";
            nextQuestionBtn.style.display = "none";
            quizFeedback.textContent = "";
        }
    }

    submitAnswerBtn.addEventListener("click", checkAnswer);
    nextQuestionBtn.addEventListener("click", nextQuestion);

    initializeQuiz();
});




// Funcionalidade adaptativa para o quiz
let userPerformance = {
    correctAnswers: 0,
    totalAnswers: 0,
    difficulty: 'basic' // basic, intermediate, advanced
};

// Banco de questões por nível de dificuldade
const quizBank = {
    basic: [
        {
            question: "Qual a principal característica de um circuito em série de corrente alternada (CA)?",
            options: [
                "A tensão é a mesma em todos os componentes.",
                "A corrente é a mesma em todos os componentes.",
                "A impedância total é a soma vetorial das impedâncias individuais.",
                "A potência total é a soma aritmética das potências individuais."
            ],
            answer: "A corrente é a mesma em todos os componentes."
        },
        {
            question: "Em um circuito paralelo de corrente alternada (CA), como se comporta a tensão entre os componentes?",
            options: [
                "É a mesma em todos os componentes.",
                "Divide-se entre os componentes.",
                "É inversamente proporcional à impedância de cada componente.",
                "Varia de acordo com a frequência da corrente."
            ],
            answer: "É a mesma em todos os componentes."
        }
    ],
    intermediate: [
        {
            question: "O que é impedância em um circuito de corrente alternada (CA)?",
            options: [
                "A oposição ao fluxo de corrente contínua.",
                "A resistência total de um circuito em corrente alternada, considerando resistência, reatância indutiva e reatância capacitiva.",
                "A soma das resistências em um circuito em série.",
                "A capacidade de um componente armazenar energia elétrica."
            ],
            answer: "A resistência total de um circuito em corrente alternada, considerando resistência, reatância indutiva e reatância capacitiva."
        },
        {
            question: "Em um circuito CA, a reatância indutiva (XL) é diretamente proporcional a qual grandeza?",
            options: [
                "Resistência",
                "Capacitância",
                "Frequência",
                "Tensão"
            ],
            answer: "Frequência"
        }
    ],
    advanced: [
        {
            question: "Em um circuito RLC série, qual condição caracteriza a ressonância?",
            options: [
                "XL = XC",
                "R = XL + XC",
                "Z = R + j(XL - XC)",
                "P = V²/R"
            ],
            answer: "XL = XC"
        },
        {
            question: "Qual é a relação entre a potência aparente (S), potência ativa (P) e potência reativa (Q) em um circuito CA?",
            options: [
                "S = P + Q",
                "S = √(P² + Q²)",
                "S = P × Q",
                "S = P - Q"
            ],
            answer: "S = √(P² + Q²)"
        }
    ]
};

// Função para adaptar a dificuldade baseada no desempenho
function adaptDifficulty() {
    const performance = userPerformance.correctAnswers / userPerformance.totalAnswers;
    
    if (performance >= 0.8 && userPerformance.difficulty === 'basic') {
        userPerformance.difficulty = 'intermediate';
        showDifficultyMessage('Parabéns! Você está progredindo para questões de nível intermediário.');
    } else if (performance >= 0.8 && userPerformance.difficulty === 'intermediate') {
        userPerformance.difficulty = 'advanced';
        showDifficultyMessage('Excelente! Agora você enfrentará questões avançadas.');
    } else if (performance < 0.5 && userPerformance.difficulty === 'advanced') {
        userPerformance.difficulty = 'intermediate';
        showDifficultyMessage('Vamos revisar conceitos intermediários para fortalecer sua base.');
    } else if (performance < 0.5 && userPerformance.difficulty === 'intermediate') {
        userPerformance.difficulty = 'basic';
        showDifficultyMessage('Vamos revisar os conceitos básicos para fortalecer sua compreensão.');
    }
}

// Função para mostrar mensagem de mudança de dificuldade
function showDifficultyMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-info mt-3';
    alertDiv.innerHTML = `<i class="fas fa-info-circle me-2"></i>${message}`;
    document.getElementById('quiz-container').appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Função para obter questões do nível atual
function getQuestionsForCurrentLevel() {
    return quizBank[userPerformance.difficulty] || quizBank.basic;
}

// Função para fornecer feedback personalizado
function getPersonalizedFeedback(isCorrect, currentQuestion) {
    if (isCorrect) {
        const encouragements = [
            "Excelente! Você demonstra boa compreensão dos conceitos.",
            "Muito bem! Continue assim.",
            "Perfeito! Sua resposta está correta.",
            "Ótimo trabalho! Você está dominando o assunto."
        ];
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    } else {
        const explanations = {
            "Qual a principal característica de um circuito em série de corrente alternada (CA)?": 
                "Em circuitos série, a corrente é a mesma em todos os componentes porque há apenas um caminho para a corrente fluir.",
            "Em um circuito paralelo de corrente alternada (CA), como se comporta a tensão entre os componentes?": 
                "Em circuitos paralelo, todos os componentes estão conectados aos mesmos pontos, portanto a tensão é igual em todos.",
            "O que é impedância em um circuito de corrente alternada (CA)?": 
                "Impedância é a oposição total ao fluxo de corrente CA, incluindo resistência, reatância indutiva e capacitiva.",
            "Em um circuito CA, a reatância indutiva (XL) é diretamente proporcional a qual grandeza?": 
                "XL = 2πfL, onde f é a frequência. Quanto maior a frequência, maior a reatância indutiva."
        };
        
        return explanations[currentQuestion] || "Revise o conceito e tente novamente.";
    }
}

