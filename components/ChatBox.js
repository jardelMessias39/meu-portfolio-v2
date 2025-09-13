// components/ChatBox.js
useEffect(() => {
  if (sessionId) {
    axios.get(`http://localhost:8000/api/chat/sessions/${sessionId}`)
      .then(res => {
        setMessages(res.data.messages);
      })
      .catch(err => {
        console.error("Erro ao buscar histórico:", err);
      });
  }
}, [sessionId]);
