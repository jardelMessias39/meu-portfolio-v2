import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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


const Chatbot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Olá! Sou o assistente virtual do portfólio. Posso te contar sobre a experiência, projetos e objetivos como desenvolvedor. O que gostaria de saber?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const enviarMensagemParaAPI = async (mensagem, sessionIdAtual) => {
    try {
      const resposta = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: mensagem,
          session_id: sessionIdAtual 
        })
      });
      
      if (!resposta.ok) {
        throw new Error(`Erro HTTP! status: ${resposta.status}`);
      }
      
      const dados = await resposta.json();
      return dados;
    } catch (erro) {
      console.error('Erro ao enviar mensagem para a API:', erro);
      throw erro;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const mensagemUsuario = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, mensagemUsuario]);
    const mensagemAtual = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const resposta = await enviarMensagemParaAPI(mensagemAtual, sessionId);
      
      // Atualizar session_id se necessário
      if (resposta.session_id && resposta.session_id !== sessionId) {
        setSessionId(resposta.session_id);
      }

      const respostaBot = {
        id: Date.now() + 1,
        type: 'bot',
        content: resposta.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, respostaBot]);
      
    } catch (erro) {
      console.error('Erro:', erro);
      
      // Resposta de fallback em caso de erro
      const respostaErro = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Desculpe, ocorreu um problema técnico. Mas posso te contar que sou um desenvolvedor júnior apaixonado por transformar ideias em código! Tenho 4 projetos principais e estou sempre aprendendo. O que você gostaria de saber?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, respostaErro]);
      
      toast({
        title: "Erro de conexão",
        description: "Houve um problema ao conectar com o servidor. Tente novamente em alguns segundos.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionButtons = [
    "Conte sobre sua experiência",
    "Quais são seus projetos?", 
    "O que te motivou?",
    "Quais seus objetivos?"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  if (!isOpen) {
    return (
  <div className={styles.chatContainer}>
    <h2>👨‍💻 Assistente do Desenvolvedor Full Stack</h2>
    <div className={styles.messages}>
      {messages.map((msg, i) => (
        <div key={i} className={`${styles.bubble} ${styles[msg.role]}`}>
          <div>{msg.content}</div>
          {msg.timestamp && (
            <small style={{ fontSize: '0.75rem', color: '#666' }}>
              {new Date(msg.timestamp).toLocaleTimeString('pt-BR')}
            </small>
          )}
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

    {/* ⬇️ Botão de limpar conversa ⬇️ */}
    <button onClick={() => setMessages([])}>🧹 Limpar conversa</button>
  </div>
);

  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Virtual</h3>
            <p className="text-xs text-blue-100">
              {sessionId ? `Sessão ativa` : 'Pergunte sobre minha experiência'}
            </p>
          </div>
        </div>
        <Button
          onClick={onToggle}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-500 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-3 w-3 text-white" />
                ) : (
                  <Bot className="h-3 w-3 text-gray-600" />
                )}
              </div>
              <div className={`rounded-2xl p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                 <span className="text-xs text-gray-500 block mt-1">
                  {formatTimestamp(message.timestamp)}
                 </span>

              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot className="h-3 w-3 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestionButtons.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                disabled={isTyping}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta..."
            className="flex-1 rounded-full border-gray-300 focus:border-blue-500"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;