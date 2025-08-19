# CircuitosEdu - Plataforma Educacional para Ensino de Circuitos Elétricos

Este projeto consiste em uma página web interativa que integra simulações da plataforma PHET com um chatbot baseado em inteligência artificial para o ensino de circuitos elétricos. A plataforma foi desenvolvida para auxiliar estudantes de cursos técnicos na compreensão de conceitos relacionados a circuitos em série, paralelo e misto.

## Estrutura do Projeto

```
projeto-circuitos/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos da página
├── js/
│   └── script.js       # Scripts de interatividade e chatbot
├── img/                # Imagens utilizadas no projeto
│   ├── circuit-hero.png
│   ├── serie-circuit.png
│   ├── paralelo-circuit.png
│   └── misto-circuit.png
└── README.md           # Este arquivo
```

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3 e JavaScript
- **Framework CSS**: Bootstrap 5
- **Bibliotecas**: Font Awesome (ícones)
- **Simulações**: Plataforma PHET (via iframe)
- **Chatbot**: Implementação em JavaScript puro

## Funcionalidades

1. **Simulações Interativas**: Integração com a plataforma PHET para experimentação prática de circuitos elétricos.
2. **Chatbot Educacional**: Assistente virtual que responde a perguntas sobre circuitos elétricos e conceitos relacionados.
3. **Material Teórico**: Conteúdo didático sobre circuitos em série, paralelo e misto.
4. **Design Responsivo**: Interface adaptável a diferentes tamanhos de tela (desktop, tablet e mobile).

## Como Usar

1. Abra o arquivo `index.html` em qualquer navegador web moderno.
2. Navegue pelas diferentes seções usando o menu superior.
3. Na seção "Simulações", você pode:
   - Interagir diretamente com a simulação PHET
   - Selecionar diferentes tipos de circuito (série, paralelo ou misto)
   - Seguir as instruções específicas para cada tipo de circuito
   - Utilizar o chatbot para tirar dúvidas

4. O chatbot pode responder a perguntas sobre:
   - Conceitos básicos de circuitos elétricos
   - Lei de Ohm
   - Características de circuitos em série, paralelo e misto
   - Componentes elétricos (resistores, capacitores, etc.)
   - Instrumentos de medição (multímetro, amperímetro, voltímetro)

## Personalização

### Modificando o Chatbot

O chatbot utiliza uma base de conhecimento simples definida no arquivo `script.js`. Para adicionar novas respostas:

1. Abra o arquivo `js/script.js`
2. Localize a constante `knowledgeBase`
3. Adicione novos pares de chave-valor seguindo o formato existente:
   ```javascript
   'palavra-chave': 'Resposta para esta palavra-chave',
   ```

### Adicionando Novas Simulações

Para adicionar novas simulações PHET:

1. Identifique a URL da simulação desejada no site do PHET
2. Adicione um novo parâmetro no objeto `circuitParams` no arquivo `script.js`
3. Atualize o seletor de circuitos no arquivo `index.html`
4. Adicione instruções específicas para a nova simulação

## Requisitos de Sistema

- Navegador web moderno com suporte a HTML5, CSS3 e JavaScript
- Conexão com a internet para carregar as simulações PHET
- Resolução de tela mínima recomendada: 320px (mobile)

## Créditos

- Simulações: [PhET Interactive Simulations](https://phet.colorado.edu/), University of Colorado Boulder
- Framework CSS: [Bootstrap](https://getbootstrap.com/)
- Ícones: [Font Awesome](https://fontawesome.com/)

## Licença

Este projeto é fornecido para fins educacionais. As simulações PHET são propriedade da University of Colorado Boulder e estão sujeitas aos seus próprios termos de uso.

---

Desenvolvido como parte do projeto "IA e Simulações Interativas no Ensino de Circuitos Elétricos".

