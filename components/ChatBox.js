import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ChatBox.module.css'; // Certifique-se que esse caminho está correto

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      axios.get(`https://meu-portfolio-backend-r1tv.onrender.com/api/chat/sessions/${sessionId}`)

        .then(res => {
          setMessages(res.data.messages);
        })
        .catch(err => {
          console.error("Erro ao buscar histórico:", err);
        });
    }
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post('https://meu-portfolio-backend-r1tv.onrender.com/api/chat', {

        session_id: sessionId
      });

      const { response, session_id } = res.data;
      setSessionId(session_id);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setInput('');
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  // ⬇️ Aqui entra o JSX que você mandou ⬇️
  return (
    <div className={styles.chatContainer}>
      <h2>👨‍💻 Assistente do Desenvolvedor Full Stack</h2>
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.bubble} ${styles[msg.role]}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        className={styles.input}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Digite sua mensagem..."
      />
    </div>
  );
}
