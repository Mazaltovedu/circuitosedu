from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Erro: Chave GEMINI_API_KEY não configurada no painel da Vercel."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica e curta sobre Circuitos CA: {user_input}"}]}]
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        result = response.json()
        
        # Verificação robusta da estrutura da resposta
        if 'candidates' in result and result['candidates']:
            candidate = result['candidates'][0]
            if 'content' in candidate and 'parts' in candidate['content']:
                return candidate['content']['parts'][0]['text']
        
        return f"O motor de IA respondeu de forma inesperada. Detalhes: {result}"
    except Exception as e:
        return f"Erro ao conectar com a API do Google: {str(e)}"

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online", "tutor": "CircuitosEdu"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Por favor, envie uma mensagem válida."}), 400

        resposta_ia = get_gemini_response(data['message'])
        return jsonify({"reply": resposta_ia}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno na função: {str(e)}"}), 500

@app.route('/')
def health_check():
    return jsonify({"message": "Servidor operando normalmente"}), 200

# Necessário para Vercel localizar o app
app = app
