def get_gemini_response(user_input):
    # .strip() garante que não existam aspas ou espaços na chave
    api_key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not api_key:
        return "Erro: Chave API não configurada na Vercel."

    # URL atualizada para a versão estável v1
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{
            "parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique de forma simples: {user_input}"}]
        }]
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        
        # Se retornar 404 ou 400, agora o erro será amigável
        if response.status_code != 200:
            return f"Erro na conexão com o Google ({response.status_code}). Verifique se o modelo está disponível na sua região."
            
        result = response.json()
        
        # Extração segura da resposta
        if 'candidates' in result and result['candidates']:
            return result['candidates'][0]['content']['parts'][0]['text']
        
        return "O tutor recebeu a dúvida, mas o motor de IA não gerou texto."
    except Exception as e:
        return f"Erro técnico: {str(e)}"
