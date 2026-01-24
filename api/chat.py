from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa o CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Ativa o CORS para permitir que o site acesse a API

@app.route('/api/chat', methods=['POST', 'GET'])
def handler():
    if request.method == 'GET':
        return jsonify({"status": "Backend CircuitosEdu Online"}), 200
        
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        api_key = os.environ.get('GEMINI_API_KEY')

        if not api_key:
            return jsonify({"reply": "Erro: Chave GEMINI_API_KEY não configurada na Vercel."}), 200

        # Chamada para o Gemini
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica: {user_message}"
                }]
            }]
        }

        response = requests.post(url, json=payload, timeout=10 )
        result = response.json()
        
        if 'candidates' in result:
            bot_reply = result['candidates'][0]['content']['parts'][0]['text']
            return jsonify({"reply": bot_reply}), 200
        else:
            return jsonify({"reply": "Erro na resposta da IA. Verifique a cota do Gemini."}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 200
