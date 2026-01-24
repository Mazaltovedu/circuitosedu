from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    # .strip() remove espaços invisíveis que causam erro 400/404
    api_key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # Usando a URL estável v1beta para evitar erros de versão
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # Estrutura mínima obrigatória
    payload = {
        "contents": [{
            "parts": [{"text": f"Responda como tutor de circuitos elétricos: {user_input}"}]
        }]
    }
    
    try:
        response = requests.post(url, json=payload, timeout=15)
        
        # Se der erro 400 ou 404, retornamos o erro real da Google para você ver
        if response.status_code != 200:
            return f"Erro Google ({response.status_code}): {response.text}"
            
        result = response.json()
        return result['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return f"Erro de conexão: {str(e)}"

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online"}), 200
    
    data = request.get_json()
    msg = data.get('message', '')
    resposta = get_gemini_response(msg)
    return jsonify({"reply": resposta}), 200

# Necessário para Vercel não dar erro de "Missing variable"
app = app
