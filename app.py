from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem

# Configuração da API OpenAI
openai.api_key = "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"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Mensagem não fornecida'}), 400
        
        # Prompt do sistema para orientar o ChatGPT
        system_prompt = """Você é o CircuitosEdu Assistente, uma IA especializada em educação técnica e automação industrial. 
        
        Você deve responder a QUALQUER pergunta que o usuário fizer, não apenas sobre circuitos elétricos. Seja útil, educativo e amigável.
        
        Suas especialidades incluem:
        - Circuitos elétricos (CA e CC)
        - Motores (DC e trifásicos)
        - Sensores (indutivos, capacitivos, etc.)
        - Automação industrial
        - CLPs (Controladores Lógicos Programáveis)
        - Instrumentação
        - Eletrônica em geral
        - Matemática e física aplicada
        - E qualquer outro tópico que o usuário perguntar
        
        Sempre forneça respostas claras, didáticas e adequadas para estudantes de ensino técnico. Se a pergunta não for sobre suas especialidades, ainda assim responda de forma útil e educativa."""
        
        # Chamada para a API OpenAI
        response = openai.ChatCompletion.create(
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
        
    except openai.error.RateLimitError:
        return jsonify({'error': 'Limite de uso da API excedido. Tente novamente mais tarde.'}), 429
    except openai.error.InvalidRequestError as e:
        return jsonify({'error': f'Erro na requisição: {str(e)}'}), 400
    except openai.error.AuthenticationError:
        return jsonify({'error': 'Erro de autenticação com a API OpenAI.'}), 401
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'CircuitosEdu Chatbot API está funcionando!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

