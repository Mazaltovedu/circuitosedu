from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

# 1. Definição obrigatória da variável 'app' no escopo global
app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Erro: Chave API não configurada no painel da Vercel."

    # Usando a versão estável da API para evitar variações de formato
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # ESTRUTURA RIGOROSA: O Google exige exatamente este formato de lista e dicionários
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica e curta: {user_input}"}
                ]
            }
        ]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        # Se houver erro 400 ou 403, capturamos aqui para não derrubar o servidor
        if response.status_code != 200:
            return f"Erro na API do Google ({response.status_code}). Verifique se a chave é válida."
            
        result = response.json()
        
        # Navegação segura para extrair a resposta
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu o sinal, mas não conseguiu gerar uma resposta."
    except Exception as e:
        return f"Erro de conexão com o motor de IA: {str(e)}"

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online", "message": "Tutor disponível"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Por favor, digite uma mensagem."}), 400

        resposta = get_gemini_response(data['message'])
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno no processamento: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"message": "Servidor CircuitosEdu operacional"}), 200

# 2. Exportação vital para a Vercel localizar o ponto de entrada
app = app
