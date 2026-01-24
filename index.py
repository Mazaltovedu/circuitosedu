from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Rota para o Chatbot
@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online", "message": "Backend CircuitosEdu operacional"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Erro: Mensagem não recebida."}), 400

        user_message = data.get('message')
        api_key = os.environ.get('GEMINI_API_KEY')

        if not api_key:
            return jsonify({"reply": "Erro: GEMINI_API_KEY não configurada na Vercel."}), 200

        # Chamada direta para a API do Gemini
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica: {user_message}"}]}]
        }

        response = requests.post(url, json=payload, timeout=10 )
        response.raise_for_status()
        result = response.json()
        
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro técnico: {str(e)}"}), 200

# Rota raiz para evitar erro 404 no domínio principal
@app.route('/')
def home():
    return jsonify({"message": "API do CircuitosEdu rodando corretamente"}), 200
