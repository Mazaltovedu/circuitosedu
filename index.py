import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# 1. Configuração do App e Permissões
app = Flask(__name__)
# Liberação ampla de CORS para permitir a comunicação entre domínios
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    """Injeta manualmente os cabeçalhos de permissão em cada resposta"""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

def get_gemini_response(user_input):
    """Conexão com a API do Google Gemini v1 Estável"""
    # .strip() remove espaços ou aspas acidentais da chave
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada no painel da Vercel."

    # URL na versão v1 para evitar o erro 404 de 'modelo não encontrado'
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique: {user_input}"}]}]
    }
    
    try:
        response = requests.post(url, json=payload, timeout=15)
        # Se o Google responder erro, capturamos o código aqui
        if response.status_code != 200:
            return f"Erro na IA (Status {response.status_code}). Verifique a chave."
            
        result = response.json()
        return result['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return f"Erro de conexão técnica: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    """Endpoint principal com suporte a preflight (OPTIONS)"""
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
    """Rota de diagnóstico para teste de saúde do servidor"""
    return jsonify({"status": "online", "message": "Backend CircuitosEdu Operacional"}), 200

# Exportação vital para o runtime da Vercel
app = app
