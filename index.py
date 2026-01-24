def get_gemini_response(user_input):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # FORMATO RIGOROSO: O Google exige esta hierarquia exata
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
        # Note o uso explícito de headers e json=payload
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        # Se retornar 400, 403 ou 404, o erro será tratado aqui
        if response.status_code != 200:
            return f"Erro na API do Google ({response.status_code}). Verifique se a chave é válida e se há créditos no Google AI Studio."
            
        result = response.json()
        
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor não conseguiu gerar uma resposta agora."

    except Exception as e:
        return f"Erro de conexão: {str(e)}"
