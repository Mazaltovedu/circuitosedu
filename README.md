# CircuitosEdu - IA e Simulações Interativas no Ensino de Circuitos Elétricos

## 🎯 Visão Geral

O **CircuitosEdu** é uma plataforma educacional inovadora que integra simulações interativas da plataforma PHET com um chatbot baseado em inteligência artificial (ChatGPT) para facilitar o aprendizado de circuitos elétricos de corrente alternada (CA) em cursos técnicos.

## ✨ Características Principais

- 🔌 **Simulações Interativas**: Integração com simulações PHET para circuitos CA
- 🤖 **Chatbot Inteligente**: Assistente virtual especializado em circuitos elétricos
- 📱 **Design Responsivo**: Interface adaptável para desktop e mobile
- 🎓 **Foco Educacional**: Conteúdo direcionado para ensino técnico
- 🔧 **Recursos de RA**: Integração com tags de Realidade Aumentada

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3
- Font Awesome 6.0
- Simulações PHET (iframes)

### Backend
- Python 3.11+
- Flask 3.0
- OpenAI API (ChatGPT)
- Flask-CORS
- Gunicorn (produção)

## 🚀 Instalação e Configuração

### Pré-requisitos

- Python 3.11 ou superior
- Chave da API OpenAI
- Git

### Instalação Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/circuitosedu.git
   cd circuitosedu
   ```

2. **Configure o ambiente Python**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate     # Windows
   ```

3. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env e adicione sua chave da API OpenAI
   ```

5. **Execute o backend**:
   ```bash
   python app.py
   ```

6. **Abra o frontend**:
   - Abra o arquivo `index.html` em um navegador
   - Ou use um servidor local: `python -m http.server 8000`

## 🌐 Implantação em Produção

Para instruções detalhadas de implantação em diferentes plataformas (Heroku, Render, Railway), consulte o [**GUIA_IMPLANTACAO.md**](GUIA_IMPLANTACAO.md).

### Resumo Rápido

1. **Backend**: Hospede em Heroku, Render ou Railway
2. **Frontend**: Hospede no GitHub Pages, Netlify ou Vercel
3. **Configure**: Atualize a URL da API no frontend
4. **Teste**: Verifique se tudo está funcionando

## 📚 Como Usar

### Para Estudantes

1. **Acesse a plataforma** através do link fornecido
2. **Explore as simulações** de circuitos CA (série, paralelo, misto)
3. **Interaja com o chatbot** para tirar dúvidas sobre conceitos
4. **Use os recursos de RA** através do app SENAI Space

### Para Professores

1. **Integre a plataforma** em suas aulas de circuitos elétricos
2. **Use o chatbot** como ferramenta de apoio pedagógico
3. **Monitore o progresso** dos estudantes através das interações
4. **Customize o conteúdo** conforme necessário

## 🎓 Conteúdo Educacional

### Tópicos Abordados

- Circuitos de corrente alternada (CA)
- Análise de impedância e reatância
- Motores trifásicos
- Transformadores
- Capacitores e indutores em CA
- Automação industrial
- Instrumentação elétrica

### Metodologia

A plataforma segue os princípios da **aprendizagem significativa**, conectando novos conhecimentos a conceitos já existentes através de:

- Experimentação prática com simulações
- Feedback imediato via chatbot
- Visualização 3D com realidade aumentada
- Conteúdo contextualizado

## 🤖 Chatbot - CircuitosEdu Assistente

O chatbot é especializado em:

- **Circuitos CA**: Análise, cálculos e conceitos
- **Componentes**: Resistores, capacitores, indutores, transformadores
- **Motores**: Funcionamento e aplicações de motores trifásicos
- **Automação**: CLPs, sensores e instrumentação
- **Suporte Geral**: Dúvidas sobre a plataforma e simulações

### Exemplos de Perguntas

- "O que é impedância em circuitos CA?"
- "Como funciona um motor trifásico?"
- "Qual a diferença entre circuito série e paralelo em CA?"
- "Como calcular a reatância capacitiva?"

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
circuitosedu/
├── app.py                 # API Flask (backend)
├── requirements.txt       # Dependências Python
├── Procfile              # Configuração Heroku
├── .env.example          # Exemplo de variáveis
├── index.html            # Página principal
├── css/
│   └── styles.css        # Estilos personalizados
├── js/
│   └── script.js         # Lógica do frontend
├── img/                  # Imagens e recursos
└── docs/                 # Documentação
```

### Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Equipe CircuitosEdu
- **Orientação Pedagógica**: Especialistas em Educação Técnica
- **Suporte Técnico**: Comunidade Open Source

## 📞 Suporte

- **Documentação**: [GUIA_IMPLANTACAO.md](GUIA_IMPLANTACAO.md)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/circuitosedu/issues)
- **Email**: suporte@circuitosedu.com

## 🎯 Roadmap

### Versão Atual (1.0)
- ✅ Simulações PHET integradas
- ✅ Chatbot com OpenAI
- ✅ Interface responsiva
- ✅ Recursos de RA

### Próximas Versões
- 🔄 Sistema de avaliação automática
- 🔄 Dashboard para professores
- 🔄 Mais simulações especializadas
- 🔄 Integração com LMS

## 📊 Estatísticas

- **Linguagens**: Python, JavaScript, HTML, CSS
- **Frameworks**: Flask, Bootstrap
- **APIs**: OpenAI ChatGPT, PHET Simulations
- **Hospedagem**: Heroku, GitHub Pages

---

**Desenvolvido com ❤️ para a educação técnica brasileira**

[![Made with Python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Powered by OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991.svg)](https://openai.com/)
[![PHET Simulations](https://img.shields.io/badge/PHET-Simulations-green.svg)](https://phet.colorado.edu/)

