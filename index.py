import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# O objeto DEVE ser 'app' para a Vercel reconhecer a função
app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    # .strip() remove espaços ou aspas acidentais da chave
    api_key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # URL ATUALIZADA para v1 (Resolve o erro 404 de 'modelo não encontrado')
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma pedagógica: {user_input}"}]
        }]
    }
    
    try:
        response = requests.post(url, json=payload, timeout=15)
        
        # Captura erros 400, 403 ou 404 para facilitar seu diagnóstico
        if response.status_code != 200:
            return f"Erro na IA ({response.status_code}). Verifique a chave no painel Vercel."
            
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

# Rota raiz para teste de saúde do servidor
@app.route('/')
def home():
    return jsonify({"message": "Servidor CircuitosEdu Ativo"}), 200
