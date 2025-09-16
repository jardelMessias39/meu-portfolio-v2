export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key não encontrada' });
  }

  const response = await fetch('https://api.openai.com/v1/models', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ status: '✅ Conectado à OpenAI', models: data.data });
  } else {
    res.status(response.status).json({ error: data });
  }
}
