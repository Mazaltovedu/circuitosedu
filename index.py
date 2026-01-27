def get_gemini_response(user_input):
    """Conecta ao Gemini usando o caminho universal para evitar Erro 404"""
    api_key = os.environ.get('GEMINI_API_KEY', '').strip().replace('"', '').replace("'", "")
    
    if not api_key:
        return "Erro: GEMINI_API_KEY não configurada na Vercel."

    # MUDANÇA: Tentando a URL v1beta com o modelo gemini-pro (mais estável para testes)
    # Se preferir manter o flash, a URL é: v1beta/models/gemini-1.5-flash:generateContent
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{"parts": [{"text": f"Você é o tutor do CircuitosEdu. Explique: {user_input}"}]}]
    }
    
    try:
        response = requests.post(url, json=payload, timeout=25)
        
        # Se o erro 404 persistir, vamos tentar automaticamente o modelo 'gemini-pro'
        if response.status_code == 404:
            url_backup = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"
            response = requests.post(url_backup, json=payload, timeout=25)

        if response.status_code != 200:
            return f"Erro na IA (Google Status {response.status_code}). Detalhe: {response.text}"
            
        result = response.json()
        return result['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return f"Erro técnico: {str(e)}"
