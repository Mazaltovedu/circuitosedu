import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Permite que seu site no GitHub Pages acesse este servidor
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

def get_gemini_response(user_input):
    """Conecta ao Gemini 1.5 Flash via v1beta para evitar erro 404"""
    # Limpa a chave de aspas ou espaços invisíveis
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # URL v1beta: Essencial para resolver o erro 'model not found'
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma pedagógica: {user_input}"}]}]
    }
    
    try:
        response = requests.post(url, json=payload, timeout=25)
        if response.status_code != 200:
            return f"Erro na IA (Google Status {response.status_code}). Detalhe: {response.text}"
            
        result = response.json()
        return result['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return f"Erro técnico de conexão: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    try:
        data = request.get_json()
        resposta = get_gemini_response(data.get('message', ''))
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"status": "Tutor Online", "engine": "Gemini 1.5 Flash v1beta"}), 200

app = app
