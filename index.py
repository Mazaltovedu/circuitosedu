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

def get_openai_response(user_input):
    api_key = os.environ.get('OPENAI_API_KEY', '').strip()
    if not api_key: return "Erro: Chave OpenAI não configurada."

    url = "https://api.openai.com/v1/chat/completions"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "Você é o tutor do CircuitosEdu, especialista em Circuitos CA."},
            {"role": "user", "content": user_input}
        ]
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=20)
        return response.json()['choices'][0]['message']['content']
    except: return "Erro de conexão com a IA."

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
    data = request.get_json()
    resposta = get_openai_response(data.get('message', ''))
    return jsonify({"reply": resposta}), 200

@app.route('/status')
def status():
    return jsonify({"status": "online", "engine": "ChatGPT"}), 200
