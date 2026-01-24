import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# O objeto DEVE se chamar 'app' para o runtime da Vercel
app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        # .strip() remove qualquer aspa ou espaço da chave
        api_key = os.environ.get('GEMINI_API_KEY', '').strip()
        
        # URL da versão estável v1 (resolve o erro 404 da v1beta)
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        payload = {
            "contents": [{
                "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma simples: {user_message}"}]
            }]
        }
        
        response = requests.post(url, json=payload, timeout=15)
        
        # Se o Google responder 404/400, tratamos aqui
        if response.status_code != 200:
            return jsonify({"reply": f"Erro na IA (Código {response.status_code}). Verifique a chave API."}), 200
            
        result = response.json()
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return jsonify({"status": "online", "message": "Backend CircuitosEdu Operacional"}), 200
