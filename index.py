from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

# 1. Definição OBRIGATÓRIA da variável app no escopo global
app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    # .strip() remove qualquer espaço ou aspas acidentais da chave
    api_key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # URL estável v1 para evitar o erro 404 de 'modelo não encontrado'
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma pedagógica: {user_input}"}]
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        if response.status_code != 200:
            return f"Erro na conexão com o Google ({response.status_code}). Verifique a chave."
            
        result = response.json()
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor não conseguiu gerar uma resposta no momento."
    except Exception as e:
        return f"Erro técnico: {str(e)}"

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online"}), 200
        
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"reply": "Por favor, digite uma mensagem."}), 400

    resposta = get_gemini_response(data['message'])
    return jsonify({"reply": resposta}), 200

@app.route('/')
def home():
    return jsonify({"message": "Servidor CircuitosEdu operacional"}), 200

# 2. Atribuição final para garantir que a Vercel encontre o ponto de entrada
# Não use blocos 'if __name__ == "__main__":'
handler = app
