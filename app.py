from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem

# Configuração da API OpenAI
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Mensagem não fornecida'}), 400
        
        # Prompt do sistema para orientar o ChatGPT
        system_prompt = """Você é o CircuitosEdu Assistente, uma IA especializada em educação técnica e automação industrial com foco em circuitos de corrente alternada (CA).
        
        Suas especialidades incluem:
        - Circuitos elétricos de corrente alternada (CA)
        - Análise de impedância e reatância
        - Motores trifásicos e suas aplicações
        - Transformadores e suas características
        - Capacitores e indutores em CA
        - Sensores (indutivos, capacitivos, etc.)
        - Automação industrial
        - CLPs (Controladores Lógicos Programáveis)
        - Instrumentação elétrica
        - Eletrônica de potência
        - Matemática e física aplicada aos circuitos CA
        
        Sempre forneça respostas claras, didáticas e adequadas para estudantes de ensino técnico. Use exemplos práticos quando possível e explique conceitos complexos de forma simples."""
        
        # Chamada para a API OpenAI usando a nova versão da biblioteca
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content.strip()
        
        return jsonify({'response': ai_response})
        
    except Exception as e:
        error_message = str(e)
        if "rate_limit_exceeded" in error_message.lower():
            return jsonify({'error': 'Limite de uso da API excedido. Tente novamente mais tarde.'}), 429
        elif "invalid_request_error" in error_message.lower():
            return jsonify({'error': f'Erro na requisição: {error_message}'}), 400
        elif "authentication" in error_message.lower():
            return jsonify({'error': 'Erro de autenticação com a API OpenAI. Verifique a chave da API.'}), 401
        else:
            return jsonify({'error': f'Erro interno: {error_message}'}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'CircuitosEdu Chatbot API está funcionando!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

