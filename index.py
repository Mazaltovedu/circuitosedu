from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

# 1. Definição obrigatória da variável 'app' no escopo global
app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # Estrutura de payload corrigida para evitar erro 400
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica: {user_input}"}]
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        result = response.json()
        
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        return "O tutor recebeu o sinal, mas a resposta veio vazia."
    except Exception as e:
        return f"Erro na conexão com a IA: {str(e)}"

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online", "message": "Backend operacional"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Mensagem inválida."}), 400

        resposta = get_gemini_response(data['message'])
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"message": "Servidor CircuitosEdu ativo"}), 200

# 2. Atribuição explícita para o runtime da Vercel
# Isso resolve o erro "Missing variable handler or app"
handler = app
