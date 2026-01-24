from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
# O CORS é vital para que o GitHub Pages consiga "conversar" com a Vercel
CORS(app) 

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    # Rota de teste para quando você clica no link
    if request.method == 'GET':
        return jsonify({"status": "online", "message": "Backend CircuitosEdu operacional"}), 200
        
    try:
        data = request.get_json()
        user_message = data.get('message')
        api_key = os.environ.get('GEMINI_API_KEY')

        if not api_key:
            return jsonify({"reply": "Erro: Chave GEMINI_API_KEY não encontrada."}), 200

        # Conexão com o motor Gemini 1.5 Flash
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica: {user_message}"}]}]
        }

        response = requests.post(url, json=payload, timeout=10)
        result = response.json()
        
        # Extração da resposta para enviar ao seu script.js
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro técnico: {str(e)}"}), 200

# Rota raiz para evitar o erro 404 que você viu antes
@app.route('/')
def home():
    return jsonify({"message": "API do CircuitosEdu rodando corretamente na raiz"}), 200
