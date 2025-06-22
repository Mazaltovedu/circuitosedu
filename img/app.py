from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem

# Configuração da OpenAI API
openai.api_key = "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"

# Prompt especializado para o chatbot educacional
SYSTEM_PROMPT = """
Você é o CircuitosEdu Assistente, uma IA especializada em auxiliar estudantes de ensino técnico em automação industrial no aprendizado de circuitos elétricos e tópicos relacionados.

Sua base de conhecimento inclui:

1. CIRCUITOS ELÉTRICOS:
   - Circuitos CA (corrente alternada) e CC (corrente contínua)
   - Análise de circuitos em série, paralelo e misto
   - Lei de Ohm, Leis de Kirchhoff
   - Conceitos de impedância, reatância, potência (ativa, reativa, aparente)
   - Componentes: resistores, capacitores, indutores, transformadores, diodos, LEDs

2. MOTORES ELÉTRICOS:
   - Motor DC: funcionamento baseado na interação entre campo magnético e corrente elétrica no rotor, controle de velocidade por variação de tensão/corrente, alto torque de partida, uso de escovas e comutador (ou brushless)
   - Motor Trifásico: conversão de energia CA trifásica em mecânica, campo magnético girante no estator, alta eficiência, autostart, robustez, ideal para aplicações industriais de alta potência

3. SENSORES INDUSTRIAIS:
   - Sensor Indutivo: detecta objetos metálicos sem contato, funciona por campo eletromagnético, aplicações em detecção de posição, contagem, controle de velocidade
   - Sensor Capacitivo: detecta objetos metálicos e não metálicos, funciona por campo elétrico, aplicações em detecção de nível, materiais diversos, indústria alimentícia

4. COMPONENTES ELETRÔNICOS:
   - Valores comerciais padronizados (séries E6, E12, E24, etc.)
   - Fontes de aquisição: distribuidores especializados, plataformas online

5. AUTOMAÇÃO INDUSTRIAL:
   - CLPs, sensores, atuadores, redes industriais
   - Conceitos de controle e monitoramento

Diretrizes de resposta:
- Use linguagem clara e didática, adequada ao ensino técnico
- Forneça explicações práticas com exemplos quando possível
- Relacione conceitos teóricos com aplicações industriais
- Seja preciso tecnicamente mas acessível pedagogicamente
- Incentive o aprendizado prático e a experimentação
"""

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Mensagem não fornecida'}), 400
        
        # Chamada para a OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content.strip()
        
        return jsonify({
            'response': ai_response,
            'source': 'openai'
        })
        
    except openai.error.RateLimitError:
        return jsonify({
            'error': 'quota_exceeded',
            'message': 'Limite de uso da API excedido. Usando base de conhecimento local.'
        }), 429
        
    except openai.error.InvalidRequestError as e:
        return jsonify({
            'error': 'invalid_request',
            'message': f'Erro na requisição: {str(e)}'
        }), 400
        
    except Exception as e:
        return jsonify({
            'error': 'server_error',
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'CircuitosEdu Chatbot Backend está funcionando!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

