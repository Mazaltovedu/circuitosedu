import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# 1. Configuração Robusta do Flask
app = Flask(__name__)

# Configuração de CORS explícita para aceitar requisições do seu domínio no GitHub
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    """Garante que os cabeçalhos de permissão acompanhem todas as respostas"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def get_gemini_response(user_input):
    """Conecta ao motor Gemini v1 (estável) com tratamento de erro profissional"""
    # Limpa a chave de qualquer caractere invisível
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro de Configuração: Chave API não encontrada na Vercel."

    # URL estável para evitar o erro 404 (model not found)
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma pedagógica: {user_input}"}]
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        if response.status_code != 200:
            return f"Erro na IA (Status {response.status_code}). Verifique a validade da chave."
            
        result = response.json()
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu o sinal, mas a IA não gerou uma resposta válida."
    except Exception as e:
        return f"Falha na conexão externa: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    """Endpoint principal com tratamento de preflight (OPTIONS)"""
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Mensagem vazia recebida."}), 400

        resposta_ia = get_gemini_response(data['message'])
        # Retorno obrigatório em formato JSON para o JavaScript ler
        return jsonify({"reply": resposta_ia}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno do servidor: {str(e)}"}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def health_check(path):
    """Rota de diagnóstico para verificar se o servidor está 'vivo'"""
    return jsonify({
        "status": "online",
        "tutor": "CircuitosEdu",
        "cors": "enabled"
    }), 200

# Vital para o runtime da Vercel encontrar o ponto de entrada
app = app
