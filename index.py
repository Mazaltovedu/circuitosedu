import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Habilita CORS para o seu domínio no GitHub Pages
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

def get_gemini_response(user_input):
    """Sistema de redundância para evitar Erro 404 do Google"""
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # Lista de modelos para tentar (o código testará um por um se der 404)
    modelos_para_testar = [
        "gemini-1.5-flash",
        "gemini-pro"
    ]
    
    payload = {
        "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique: {user_input}"}]}]
    }

    for modelo in modelos_para_testar:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent?key={api_key}"
        try:
            response = requests.post(url, json=payload, timeout=25)
            # Se funcionar (Status 200), retorna a resposta imediatamente
            if response.status_code == 200:
                result = response.json()
                return result['candidates'][0]['content']['parts'][0]['text']
            
            # Se der 404, o loop continua para o próximo modelo
            if response.status_code == 404:
                continue
                
            # Se for outro erro (ex: 400), retorna o detalhe técnico
            return f"Erro na IA (Status {response.status_code}). Detalhe: {response.text}"
            
        except Exception as e:
            return f"Erro técnico de conexão: {str(e)}"

    return "Erro: Nenhum modelo de IA disponível para esta chave no momento (Erro 404 em todos)."

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
    return jsonify({"status": "Tutor Online", "engine": "Gemini Multi-Model"}), 200

app = app
