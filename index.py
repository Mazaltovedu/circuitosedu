import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# 1. Instância do App (DEVE ser 'app' para compatibilidade total)
app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online", "tutor": "CircuitosEdu"}), 200
        
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        # Limpeza da chave para evitar erros de caractere invisível
        api_key = os.environ.get('GEMINI_API_KEY', '').strip()
        
        # URL da versão estável v1
        url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        payload = {
            "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma simples: {user_message}"}]}]
        }
        
        response = requests.post(url, json=payload, timeout=15)
        
        if response.status_code != 200:
            return jsonify({"reply": f"Erro na IA (Código {response.status_code}). Verifique a chave API."}), 200
            
        result = response.json()
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro interno: {str(e)}"}), 500

@app.route('/')
def home():
    return jsonify({"message": "Backend CircuitosEdu Operacional"}), 200

# NÃO ADICIONE NADA ABAIXO DISSO - A VERCEL ENCONTRARÁ O 'app' AUTOMATICAMENTE
