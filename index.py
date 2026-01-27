import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

def get_perplexity_response(user_input):
    api_key = os.environ.get('PERPLEXITY_API_KEY', '').strip()
    
    if not api_key:
        return "Erro: PERPLEXITY_API_KEY não configurada na Vercel."

    url = "https://api.perplexity.ai/chat/completions"
    
    payload = {
        "model": "llama-3.1-sonar-small-128k-online", # Modelo padrão da Perplexity
        "messages": [
            {
                "role": "system",
                "content": "Você é um tutor especializado em Circuitos de Corrente Alternada (CA) para o projeto CircuitosEdu. Explique conceitos de forma pedagógica."
            },
            {
                "role": "user",
                "content": user_input
            }
        ],
        "temperature": 0.2
    }
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, timeout=30)
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content']
        else:
            return f"Erro na Perplexity (Status {response.status_code}): {response.text}"
    except Exception as e:
        return f"Erro técnico de conexão: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    try:
        data = request.get_json()
        resposta = get_perplexity_response(data.get('message', ''))
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"status": "Tutor Online", "engine": "Perplexity AI"}), 200
