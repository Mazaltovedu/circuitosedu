@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({"status": "online", "message": "Backend CircuitosEdu operacional"}), 200
        
    try:
        data = request.get_json()
        user_message = data.get('message')
        api_key = os.environ.get('GEMINI_API_KEY')

        if not api_key:
            return jsonify({"reply": "Erro: GEMINI_API_KEY não configurada na Vercel."}), 200

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica: {user_message}"}]}]
        }

        response = requests.post(url, json=payload, timeout=10)
        result = response.json()
        
        # VERIFICAÇÃO DE SEGURANÇA PARA EVITAR O ERRO 'CANDIDATES'
        if 'candidates' in result and len(result['candidates']) > 0:
            reply = result['candidates'][0]['content']['parts'][0]['text']
            return jsonify({"reply": reply}), 200
        else:
            # Se a Google retornar erro, mostramos o que aconteceu para você depurar
            error_msg = result.get('error', {}).get('message', 'Erro desconhecido na API do Gemini')
            return jsonify({"reply": f"O motor de IA recusou a conexão. Motivo: {error_msg}"}), 200

    except Exception as e:
        return jsonify({"reply": f"Erro técnico no servidor: {str(e)}"}), 200
