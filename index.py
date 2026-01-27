import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST', 'GET'])
def teste_diagnostico():
    # Verifica se a chave existe no sistema da Vercel
    chave_existe = "GEMINI_API_KEY" in os.environ
    nome_da_chave = os.environ.get('GEMINI_API_KEY', 'Vazio')
    
    # Retorna um diagnóstico seguro (mostra só os 4 primeiros dígitos)
    return jsonify({
        "status_servidor": "Online",
        "variavel_encontrada": chave_existe,
        "inicio_da_chave": nome_da_chave[:4] + "****",
        "mensagem_ajuda": "Se 'variavel_encontrada' for false, o erro é no painel da Vercel."
    }), 200
