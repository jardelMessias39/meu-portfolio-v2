import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ChatBox.module.css';

<div className={styles.chatContainer}>
  ...
  <div className={styles.responseBox}>
    <strong>Resposta:</strong>
    <p>{resposta}</p>
  </div>
</div>

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) return `Hoje às ${time}`;
  if (isYesterday) return `Ontem às ${time}`;
  return `${date.toLocaleDateString()} às ${time}`;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  


  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
  const createSession = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/chat`, { message: "init" });
      setSessionId(res.data.session_id);
    } catch (err) {
      console.error("Erro ao criar sessão:", err);
    }
  };

  if (!sessionId) {
    createSession();
  }
}, []);


 useEffect(() => {
  const createSession = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/chat`, { message: "init" });
      setSessionId(res.data.session_id);
    } catch (err) {
      console.error("Erro ao criar sessão:", err);
    }
  };

  createSession(); // chama direto
}, []);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post(`${BASE_URL}/api/chat`, {
  message: input,
  session_id: sessionId
});


      const { response, session_id } = res.data;
     if (!sessionId) {
  setSessionId(session_id);
}

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setInput('');
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  // ⬇️ Aqui entra o JSX que você mandou ⬇️
  return (
    <div className={styles.messages}>
  {messages.map((msg, i) => (
    <div key={i} className={`${styles.bubble} ${styles[msg.role]}`}>
      <p>{msg.content}</p>
      <span className={styles.timestamp}>
        {new Date(msg.timestamp).toLocaleString()}
      </span>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>

  );
}
