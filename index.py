import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# A Vercel exige que o objeto se chame 'app'
app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        # .strip() remove espaços ou aspas acidentais da sua chave
        api_key = os.environ.get('GEMINI_API_KEY', '').strip()
        
        # URL atualizada para v1 (Resolve o erro 404 de 'modelo não encontrado')
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        payload = {
            "contents": [{
                "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma simples: {user_message}"}]
            }]
        }
        
        response = requests.post(url, json=payload, timeout=15)
        
        if response.status_code != 200:
            # Captura o erro real do Google para facilitar seu diagnóstico
            return jsonify({"reply": f"Erro na IA ({response.status_code}). Verifique sua chave no painel Vercel."}), 200
            
        result = response.json()
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

# Rota padrão para teste de saúde do servidor
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return jsonify({"status": "online", "message": "Backend CircuitosEdu Ativo"}), 200
