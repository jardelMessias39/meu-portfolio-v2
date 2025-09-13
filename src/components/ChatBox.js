import { useState } from "react";

export default function ChatBox() {
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: mensagem,
          session_id: null
        }),
      });

      const data = await res.json();
      setResposta(data.response || "Sem resposta");
    } catch (err) {
      setResposta("Erro ao conectar com o chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Chat com o Desenvolvedor</h2>
      <textarea
        rows={4}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem..."
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={enviarMensagem} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
      {resposta && (
        <div style={{ marginTop: "1rem", background: "#f0f0f0", padding: "1rem" }}>
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}

