from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

# Configuração do App e Permissões de Acesso (CORS)
app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    """Função robusta para conectar com a API do Google Gemini"""
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Erro: Chave API não configurada no painel da Vercel."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # Estrutura de JSON estrita exigida pelo Google
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica sobre Circuitos CA: {user_input}"}
                ]
            }
        ]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        result = response.json()
        
        # Navegação segura na árvore do JSON de resposta
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu o sinal, mas a resposta veio vazia."
    except Exception as e:
        return f"Erro na conexão com a IA: {str(e)}"

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    """Rota principal do Chatbot"""
    if request.method == 'GET':
        return jsonify({"status": "online", "message": "Backend operacional"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Mensagem inválida."}), 400

        resposta = get_gemini_response(data['message'])
        return jsonify({"reply": resposta}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/')
def home():
    """Rota de verificação do servidor"""
    return jsonify({"message": "Servidor CircuitosEdu ativo na raiz"}), 200

# Exportação vital para o Runtime da Vercel localizar o ponto de entrada
app = app
