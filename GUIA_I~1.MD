# Guia de Implantação - CircuitosEdu Chatbot

## Visão Geral

Este guia fornece instruções detalhadas para implantar o sistema CircuitosEdu, que consiste em:

- **Frontend**: Site estático com HTML, CSS e JavaScript
- **Backend**: API Flask integrada com OpenAI ChatGPT
- **Integração**: Comunicação entre frontend e backend via API REST

## Pré-requisitos

Antes de começar, certifique-se de ter:

1. **Chave da API OpenAI**: Obtenha em [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Conta GitHub**: Para versionamento e deploy do frontend
3. **Conta em plataforma de hospedagem**: Heroku, Render, Railway, etc.

## Estrutura do Projeto

```
projeto-circuitos/
├── app.py                 # Aplicação Flask (backend)
├── requirements.txt       # Dependências Python
├── Procfile              # Configuração para Heroku
├── .env.example          # Exemplo de variáveis de ambiente
├── index.html            # Página principal (frontend)
├── css/
│   └── styles.css        # Estilos CSS
├── js/
│   └── script.js         # JavaScript principal
└── img/                  # Imagens do projeto
```

## Parte 1: Implantação do Backend (API Flask)

### Opção 1: Heroku (Recomendado)

#### 1.1 Preparação

1. Instale o Heroku CLI: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Faça login no Heroku:
   ```bash
   heroku login
   ```

#### 1.2 Criação do App

1. Navegue até o diretório do projeto:
   ```bash
   cd projeto-circuitos
   ```

2. Crie um novo app no Heroku:
   ```bash
   heroku create seu-app-name-backend
   ```
   
   **Nota**: Substitua `seu-app-name-backend` por um nome único.

#### 1.3 Configuração das Variáveis de Ambiente

Configure a chave da API OpenAI:
```bash
heroku config:set OPENAI_API_KEY=sua_chave_da_api_openai_aqui
```

#### 1.4 Deploy

1. Inicialize o repositório Git (se ainda não foi feito):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Adicione o remote do Heroku:
   ```bash
   heroku git:remote -a seu-app-name-backend
   ```

3. Faça o deploy:
   ```bash
   git push heroku main
   ```

4. Sua API estará disponível em: `https://seu-app-name-backend.herokuapp.com`

#### 1.5 Teste da API

Teste se a API está funcionando:
```bash
curl https://seu-app-name-backend.herokuapp.com/health
```

### Opção 2: Render

#### 2.1 Preparação

1. Acesse [https://render.com](https://render.com) e crie uma conta
2. Conecte sua conta GitHub

#### 2.2 Criação do Serviço

1. Clique em "New +" → "Web Service"
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: `circuitosedu-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`

#### 2.3 Configuração das Variáveis de Ambiente

Na seção "Environment Variables", adicione:
- **Key**: `OPENAI_API_KEY`
- **Value**: `sua_chave_da_api_openai_aqui`

#### 2.4 Deploy

1. Clique em "Create Web Service"
2. O Render fará o deploy automaticamente
3. Sua API estará disponível em: `https://circuitosedu-backend.onrender.com`

### Opção 3: Railway

#### 3.1 Preparação

1. Acesse [https://railway.app](https://railway.app) e crie uma conta
2. Instale o Railway CLI (opcional)

#### 3.2 Deploy

1. Clique em "New Project" → "Deploy from GitHub repo"
2. Selecione seu repositório
3. Railway detectará automaticamente que é um projeto Python
4. Configure a variável de ambiente:
   - **OPENAI_API_KEY**: `sua_chave_da_api_openai_aqui`
5. O deploy será feito automaticamente

## Parte 2: Configuração do Frontend

### 2.1 Atualização da URL da API

No arquivo `index.html`, localize a seção de configuração e atualize a URL:

```html
<script>
    // Configure a URL da API do backend aqui
    // Substitua pela URL do seu backend hospedado
    window.CHATBOT_API_URL = 'https://seu-app-name-backend.herokuapp.com';
</script>
```

### 2.2 Implantação do Frontend

#### Opção A: GitHub Pages

1. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "Configurar URL da API para produção"
   git push origin main
   ```

2. No GitHub, vá para Settings → Pages
3. Configure:
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
4. Clique em "Save"
5. Seu site estará disponível em: `https://seu-usuario.github.io/seu-repositorio`

#### Opção B: Netlify

1. Acesse [https://netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para o deploy
3. Ou conecte seu repositório GitHub para deploy automático

#### Opção C: Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Importe seu projeto do GitHub
3. Configure e faça o deploy

## Parte 3: Configuração de CORS

Se você encontrar erros de CORS, certifique-se de que o backend está configurado corretamente. O arquivo `app.py` já inclui:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem
```

Para maior segurança em produção, você pode restringir as origens:

```python
CORS(app, origins=["https://seu-dominio-frontend.com"])
```

## Parte 4: Monitoramento e Logs

### Heroku

Visualizar logs:
```bash
heroku logs --tail -a seu-app-name-backend
```

### Render

Os logs estão disponíveis no dashboard do Render.

### Railway

Os logs estão disponíveis no dashboard do Railway.

## Parte 5: Solução de Problemas Comuns

### Problema 1: Erro 500 no Backend

**Possíveis causas:**
- Chave da API OpenAI inválida ou não configurada
- Dependências não instaladas corretamente

**Solução:**
1. Verifique os logs da aplicação
2. Confirme se a variável `OPENAI_API_KEY` está configurada
3. Teste a chave da API manualmente

### Problema 2: Erro de CORS

**Sintoma:** Erro no console do navegador sobre CORS

**Solução:**
1. Verifique se `Flask-CORS` está instalado
2. Confirme se `CORS(app)` está no código
3. Teste a API diretamente (sem o frontend)

### Problema 3: Chatbot não responde

**Possíveis causas:**
- URL da API incorreta no frontend
- Backend não está rodando
- Problemas de conectividade

**Solução:**
1. Verifique se a URL da API está correta no `index.html`
2. Teste a API diretamente: `curl https://sua-api.com/health`
3. Verifique os logs do backend

### Problema 4: Simulação PHET não carrega

**Possível causa:** Parâmetros inválidos na URL

**Solução:**
A URL da simulação foi simplificada para evitar erros:
```javascript
const phetBaseUrl = 'https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_all.html?locale=pt';
```

## Parte 6: Manutenção e Atualizações

### Atualizando o Backend

1. Faça as alterações no código
2. Commit e push:
   ```bash
   git add .
   git commit -m "Descrição da atualização"
   git push heroku main  # Para Heroku
   # ou
   git push origin main  # Para Render/Railway (deploy automático)
   ```

### Atualizando o Frontend

1. Faça as alterações no código
2. Commit e push:
   ```bash
   git add .
   git commit -m "Atualização do frontend"
   git push origin main
   ```
3. O GitHub Pages atualizará automaticamente

### Monitoramento de Custos

- **Heroku**: Plano gratuito limitado, planos pagos a partir de $7/mês
- **Render**: Plano gratuito com limitações, planos pagos a partir de $7/mês
- **Railway**: Créditos gratuitos mensais, pagamento por uso
- **OpenAI API**: Pagamento por uso (tokens)

## Parte 7: Segurança

### Boas Práticas

1. **Nunca exponha a chave da API no frontend**
2. **Use HTTPS em produção**
3. **Configure rate limiting se necessário**
4. **Monitore o uso da API OpenAI**
5. **Mantenha as dependências atualizadas**

### Configuração de Rate Limiting (Opcional)

Para evitar abuso da API, você pode adicionar rate limiting ao Flask:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/chat', methods=['POST'])
@limiter.limit("10 per minute")
def chat():
    # ... código existente
```

## Conclusão

Seguindo este guia, você terá o sistema CircuitosEdu funcionando completamente em produção, com:

- ✅ Backend Flask hospedado e funcionando
- ✅ Frontend acessível via web
- ✅ Chatbot integrado com OpenAI
- ✅ Simulações PHET funcionando
- ✅ Sistema monitorado e seguro

Para suporte adicional, consulte a documentação das plataformas utilizadas ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido por**: Equipe CircuitosEdu  
**Data**: Janeiro 2025  
**Versão**: 1.0

