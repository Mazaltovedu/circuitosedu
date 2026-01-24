from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

# 1. Definição obrigatória da variável 'app' para a Vercel
app = Flask(__name__)
CORS(app)

def get_gemini_response(user_input):
    # Captura a chave e remove qualquer espaço acidental
    api_key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # URL oficial da API v1beta
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # ESTRUTURA RIGOROSA: O Google exige exatamente este formato
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica e curta: {user_input}"}]
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        # Se houver erro 400, capturamos a mensagem real do Google para depurar
        if response.status_code != 200:
            return f"Erro na API do Google ({response.status_code}). Verifique se a chave é válida no Google AI Studio."
            
        result = response.json()
        
        # Extração segura da resposta
        if 'candidates' in result and result[0].get('content'): # Ajuste de segurança na navegação
             return result['candidates'][0]['content']['parts'][0]['text']
        
        # Caso padrão para evitar o erro de 'candidates' que você viu antes
        return result['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return f"Erro de conexão com a IA: {str(e)}"

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

# 2. Exportação vital para a Vercel
app = app
