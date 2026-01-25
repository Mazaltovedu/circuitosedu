import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# 1. Configuração do App e do "Disjuntor" de Segurança (CORS)
app = Flask(__name__)
# Permite que o seu site no GitHub Pages (mazaltovedu.github.io) acesse esta API
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    """Garante que todos os cabeçalhos de permissão sejam enviados ao navegador"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def get_gemini_response(user_input):
    """Conecta com o motor de IA utilizando a URL estável"""
    # .strip() remove espaços ou aspas invisíveis que causam erro 400/404
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada no painel da Vercel."

    # URL na versão v1 estável (resolve o erro 'model not found' das suas imagens)
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
            return f"Erro na IA (Código {response.status_code}). Verifique a chave no Google AI Studio."
            
        result = response.json()
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu a dúvida, mas o motor de IA não gerou resposta."
    except Exception as e:
        return f"Erro técnico de conexão: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    """Rota principal com suporte obrigatório a OPTIONS (Preflight)"""
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Mensagem inválida."}), 400

        resposta = get_gemini_response(data['message'])
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    """Rota de teste de saúde do servidor"""
    return jsonify({
        "status": "online",
        "tutor": "CircuitosEdu",
        "message": "Servidor operacional com CORS habilitado."
    }), 200

# 2. Exportação vital para o ambiente Serverless da Vercel
app = app
