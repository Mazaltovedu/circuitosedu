import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Liberação de segurança para o seu site no GitHub Pages
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

def get_openai_response(user_input):
    """Conecta com a API do ChatGPT"""
    api_key = os.environ.get('OPENAI_API_KEY', '').strip()
    if not api_key:
        return "Erro: OPENAI_API_KEY não configurada na Vercel."

    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    payload = {
        "model": "gpt-4o-mini", # Modelo econômico e rápido para estudantes
        "messages": [
            {"role": "system", "content": "Você é o tutor do CircuitosEdu, especialista em Circuitos CA."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.7
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=20)
        if response.status_code != 200:
            return f"Erro OpenAI ({response.status_code}): {response.text}"
            
        result = response.json()
        return result['choices'][0]['message']['content']
    except Exception as e:
        return f"Erro de conexão técnica: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Mensagem inválida."}), 400

        resposta = get_openai_response(data['message'])
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"status": "online", "engine": "ChatGPT"}), 200

app = app
