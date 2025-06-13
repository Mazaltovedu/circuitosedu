/* 
 * Estilos para a página web "IA e Simulações Interativas no Ensino de Circuitos Elétricos"
 * Desenvolvido como parte do projeto de integração de simulações PHET com chatbot de IA
 */

/* ===== Variáveis CSS ===== */
:root {
    --primary-color: #1a73e8;
    --primary-dark: #0d47a1;
    --primary-light: #e8f0fe;
    --secondary-color: #ff9800;
    --secondary-dark: #e65100;
    --text-color: #333333;
    --light-text: #666666;
    --white: #ffffff;
    --light-gray: #f5f5f5;
    --border-color: #e0e0e0;
    --success-color: #4caf50;
    --warning-color: #ff9800;
    --error-color: #f44336;
}

/* ===== Estilos Gerais ===== */
body {
    font-family: 'Open Sans', sans-serif;
    color: var(--text-color);
    line-height: 1.6;
    padding-top: 56px; /* Espaço para o navbar fixo */
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}

.section-title {
    position: relative;
    margin-bottom: 1rem;
    color: var(--primary-dark);
}

.section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--secondary-color);
    margin: 0.5rem auto;
}

.section-subtitle {
    color: var(--light-text);
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

/* ===== Header e Navegação ===== */
.navbar {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
    font-size: 1.5rem;
}

.nav-link {
    font-weight: 600;
    padding: 0.5rem 1rem;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: var(--primary-color);
}

/* ===== Hero Section ===== */
.hero-section {
    background-color: var(--primary-light);
    padding: 6rem 0;
    margin-bottom: 2rem;
}

.hero-section h1 {
    color: var(--primary-dark);
}

.hero-section .btn-primary {
    padding: 0.75rem 1.5rem;
    font-weight: 600;
}

/* ===== Simulações Section ===== */
.simulation-container {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.phet-container {
    position: relative;
    width: 100%;
    height: 600px;
    background-color: #f0f0f0;
}

#phet-iframe {
    border: none;
    width: 100%;
    height: 100%;
}

.controls-container {
    margin-top: 1.5rem;
}

.instructions ol {
    padding-left: 1.2rem;
}

.instructions li {
    margin-bottom: 0.5rem;
}

/* ===== Chatbot Styles ===== */
.chatbot-container {
    height: 100%;
}

.chatbot-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chatbot-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    height: 500px;
}

.chat-messages {
    display: flex;
    flex-direction: column;
}

.message {
    margin-bottom: 1rem;
    max-width: 80%;
}

.user-message {
    align-self: flex-end;
}

.bot-message {
    align-self: flex-start;
}

.message-content {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
}

.user-message .message-content {
    background-color: var(--primary-color);
    color: white;
    border-top-right-radius: 0;
}

.bot-message .message-content {
    background-color: var(--light-gray);
    border-top-left-radius: 0;
}

.chat-float-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
}

.chat-float-button .btn {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== Material Teórico Section ===== */
.card {
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
    color: var(--primary-dark);
    font-weight: 600;
}

.card ul {
    padding-left: 1.2rem;
}

/* ===== Sobre o Projeto Section ===== */
#sobre h3 {
    color: var(--primary-dark);
    margin-bottom: 1rem;
}

#sobre ul {
    padding-left: 1.2rem;
}

/* ===== Footer ===== */
.footer {
    background-color: #343a40;
}

.footer h5 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.footer a {
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer a:hover {
    color: var(--secondary-color) !important;
}

/* ===== Modais ===== */
.modal-header {
    border-bottom: none;
}

.modal-footer {
    border-top: none;
}

/* ===== Responsividade ===== */
@media (max-width: 991.98px) {
    .chatbot-container {
        margin-top: 2rem;
    }
    
    .phet-container {
        height: 450px;
    }
}

@media (max-width: 767.98px) {
    .hero-section {
        padding: 4rem 0;
    }
    
    .hero-section h1 {
        font-size: 2.5rem;
    }
    
    .phet-container {
        height: 350px;
    }
    
    .chatbot-body {
        height: 350px;
    }
}

@media (max-width: 575.98px) {
    .hero-section {
        padding: 3rem 0;
    }
    
    .hero-section h1 {
        font-size: 2rem;
    }
    
    .phet-container {
        height: 300px;
    }
}

/* ===== Animações e Transições ===== */
.btn {
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: var(--primary-dark);
    border-color: var(--primary-dark);
}

.btn-outline-primary {
    color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-outline-primary:hover {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

/* Efeito de fade para elementos ao carregar a página */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.hero-section, .section-title, .card {
    animation: fadeIn 0.8s ease-out forwards;
}

.hero-section {
    animation-delay: 0.2s;
}

.section-title {
    animation-delay: 0.4s;
}

.card {
    animation-delay: 0.6s;
}

