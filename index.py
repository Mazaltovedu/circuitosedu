from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST', 'GET'])
def chat_handler():
    if request.method == 'GET':
        return jsonify({"status": "Backend Online"}), 200
        
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        api_key = os.environ.get('GEMINI_API_KEY')

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": f"Tutor CircuitosEdu: {user_message}"}]}]
        }

        response = requests.post(url, json=payload, timeout=10 )
        result = response.json()
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro: {str(e)}"}), 200

# Importante para a Vercel reconhecer o app Flask
def handler(event, context):
    return app(event, context)
