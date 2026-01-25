import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# 1. Instância do App e configuração de CORS para permitir o GitHub
app = Flask(__name__)
# Permite que seu site no GitHub acesse esta API sem ser bloqueado pelo navegador
CORS(app, resources={r"/api/*": {"origins": "*"}})

def get_gemini_response(user_input):
    """Função para conectar com o motor Gemini na versão estável v1"""
    # .strip() remove espaços ou aspas acidentais da chave no painel da Vercel
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro: GEMINI_API_KEY não encontrada nas variáveis de ambiente da Vercel."

    # URL estável v1 para evitar o erro 404 de 'modelo não encontrado'
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma simples: {user_input}"}]
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        if response.status_code != 200:
            return f"Erro na IA do Google (Código {response.status_code}). Verifique a chave API."
            
        result = response.json()
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu a dúvida, mas o motor de IA não gerou texto."
    except Exception as e:
        return f"Erro técnico de conexão: {str(e)}"

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    """Rota principal do chat com suporte a preflight CORS"""
    # Responde à verificação de segurança do navegador (CORS)
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"reply": "Por favor, envie uma mensagem válida."}), 400

        resposta_ia = get_gemini_response(data['message'])
        return jsonify({"reply": resposta_ia}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno no servidor: {str(e)}"}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    """Rota de verificação de saúde do sistema"""
    return jsonify({
        "status": "online",
        "tutor": "CircuitosEdu",
        "message": "Servidor Flask operacional e com CORS habilitado."
    }), 200

# 2. Exportação vital para a Vercel localizar o app
app = app
