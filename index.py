def get_gemini_response(user_input):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Erro: Chave API não configurada na Vercel."

    # URL correta da API Gemini 1.5 Flash
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # ESTRUTURA CORRIGIDA: O Google exige que 'parts' seja uma lista de dicionários
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"Você é o tutor do CircuitosEdu. Responda de forma pedagógica e curta sobre Circuitos CA: {user_input}"}
                ]
            }
        ]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        # Enviando a requisição com os headers corretos
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        # Se houver erro 400, 403, etc., ele cairá no except
        response.raise_for_status()
        
        result = response.json()
        
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu o sinal, mas a resposta veio vazia."

    except requests.exceptions.HTTPError as err:
        # Aqui capturamos o erro 400 e tentamos ler o que o Google diz
        return f"Erro na API do Google (Verifique sua chave ou cota): {err.response.text}"
    except Exception as e:
        return f"Erro de conexão: {str(e)}"
