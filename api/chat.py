from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/api/chat', methods=['POST', 'GET'])
def handler():
    if request.method == 'GET':
        return jsonify({"status": "Backend Online"}), 200
        
    data = request.get_json()
    user_message = data.get('message', '')
    api_key = os.environ.get('GEMINI_API_KEY')

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": f"Tutor CircuitosEdu: {user_message}"}]}]
    }

    try:
        response = requests.post(url, json=payload )
        result = response.json()
        reply = result['candidates'][0]['content']['parts'][0]['text']
        return jsonify({"reply": reply}), 200
    except Exception as e:
        return jsonify({"reply": f"Erro: {str(e)}"}), 200
