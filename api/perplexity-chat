// api/perplexity-chat.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  try {
    const response = await fetch("https://api.perplexity.ai/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar-pro", // ajuste se necessário conforme sua conta
        query: message
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro Perplexity:", errorText);
      return res
        .status(500)
        .json({ error: "Falha na chamada à API da Perplexity" });
    }

    const data = await response.json();
    const reply = data.answer || data.output || JSON.stringify(data);

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Erro geral:", err);
    return res.status(500).json({ error: "Erro ao consultar a API da Perplexity" });
  }
}
