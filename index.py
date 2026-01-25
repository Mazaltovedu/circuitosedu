import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_msg = data.get('message', '')
        # Remove espaços/aspas da chave
        key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
        
        # URL v1 estável
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={key}"
        
        payload = {
            "contents": [{"parts": [{"text": user_msg}]}]
        }
        
        response = requests.post(url, json=payload, timeout=15)
        
        if response.status_code != 200:
            return jsonify({"reply": f"Erro Google: {response.status_code}"}), 200
            
        result = response.json()
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro: {str(e)}"}), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return jsonify({"status": "online"}), 200
