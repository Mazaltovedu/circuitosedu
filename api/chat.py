from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST', 'GET'])
def handler_api(): # Mudei o nome interno apenas para evitar conflito com a váriavel handler
    if request.method == 'GET':
        return jsonify({"status": "Backend operacional"}), 200
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        api_key = os.environ.get('GEMINI_API_KEY')
        if not api_key:
            return jsonify({"reply": "Erro: GEMINI_API_KEY ausente."}), 500
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {"contents": [{"parts": [{"text": f"Tutor CircuitosEdu: {user_message}"}]}]}
        response = requests.post(url, json=payload, timeout=8)
        result = response.json()
        bot_reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": bot_reply}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro: {str(e)}"}), 500

# Troque por esta linha para garantir a compatibilidade
handler = app
