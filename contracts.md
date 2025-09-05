# Contratos de Integração - Portfólio com Chatbot

## 📋 Visão Geral
Integração entre frontend React e backend FastAPI para implementar chatbot inteligente usando Emergent LLM.

## 🎯 Objetivos
- Substituir respostas mock por IA real
- Criar experiência conversacional personalizada
- Manter contexto sobre o desenvolvedor e projetos

## 🔄 APIs Backend a Implementar

### 1. POST /api/chat
**Endpoint:** `/api/chat`
**Método:** `POST`
**Propósito:** Processar mensagens do chatbot com IA

**Request Body:**
```json
{
  "message": "string",
  "session_id": "string (opcional)"
}
```

**Response:**
```json
{
  "response": "string",
  "session_id": "string"
}
```

### 2. GET /api/chat/sessions/{session_id}
**Endpoint:** `/api/chat/sessions/{session_id}`
**Método:** `GET`
**Propósito:** Recuperar histórico de conversa

**Response:**
```json
{
  "session_id": "string",
  "messages": [
    {
      "role": "user|assistant",
      "content": "string",
      "timestamp": "ISO datetime"
    }
  ]
}
```

## 🎨 Frontend - Dados Mock Atuais

### Localização: `/app/frontend/src/data/mock.js`
**Dados que serão mantidos:**
- `profileData` - Informações básicas do desenvolvedor
- `skills` - Habilidades técnicas
- `projects` - Detalhes dos projetos
- `experience` - Experiência profissional

**Dados que serão removidos:**
- `chatbotResponses` - Substituído por IA real

### Componente: `/app/frontend/src/components/Chatbot.jsx`
**Alterações necessárias:**
- Substituir função `getBotResponse()` por chamada à API
- Implementar gerenciamento de sessão
- Manter interface e UX existentes

## 🧠 Configuração da IA

### Emergent LLM Setup
- **Modelo:** Usar modelo padrão Emergent
- **Contexto:** Informações detalhadas do desenvolvedor
- **Personalidade:** Profissional, entusiasmado, focado em acessibilidade

### Prompt System
**Contexto base para a IA:**
```
Você é o assistente virtual do portfólio de um desenvolvedor júnior full stack.

INFORMAÇÕES DO DESENVOLVEDOR:
- Nome: Desenvolvedor Full Stack
- Início na programação: 1 de junho de 2025
- Empresa: DevClub
- Formação: Licenciatura em Informática - UNIT (2019)
- Tecnologias atuais: HTML, CSS, JavaScript
- Próximos estudos: React, Node.js

PROJETOS:
1. Jogo Embaralhado - Quebra-cabeça interativo para desenvolver concentração
2. Chuva de Palavras - Jogo de digitação para coordenação motora
3. Site de Turismo Acessível - Plataforma com foco em acessibilidade

PERSONALIDADE:
- Tranquilo e determinado
- Apaixonado por transformar código em soluções visuais
- Focado em criar projetos que impactem positivamente as pessoas
- Sempre em busca de aprendizado
- Valoriza muito acessibilidade

OBJETIVOS:
- Participar de equipes que fazem a diferença
- Desenvolver projetos que melhorem a vida das pessoas
- Se tornar um programador completo

Responda de forma natural, entusiasmada e profissional. Foque nos projetos, experiência e motivações do desenvolvedor.
```

## 🔧 Implementação Backend

### Modelos MongoDB
```python
class ChatSession(BaseModel):
    session_id: str
    created_at: datetime
    updated_at: datetime
    messages: List[dict]

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime
```

### Integração Emergent LLM
- Usar biblioteca/SDK oficial Emergent
- Implementar rate limiting
- Cache de respostas comuns
- Logging de conversas

## 🔗 Integração Frontend-Backend

### Alterações no Chatbot.jsx
1. **Substituir `getBotResponse()`:**
```javascript
const sendMessageToAPI = async (message, sessionId) => {
  const response = await fetch(`${API}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId })
  });
  return response.json();
};
```

2. **Gerenciar sessão:**
```javascript
const [sessionId, setSessionId] = useState(null);
```

3. **Manter UX existente:**
- Loading states
- Typing indicators
- Error handling

## 📊 Dados de Teste

### Cenários de Teste
1. **Perguntas sobre experiência:** "Conte sobre sua experiência"
2. **Projetos específicos:** "Fale sobre o jogo Embaralhado"
3. **Motivação:** "O que te motivou a programar?"
4. **Habilidades:** "Quais tecnologias você domina?"
5. **Objetivos:** "Quais são seus objetivos?"

### Respostas Esperadas
- Naturais e conversacionais
- Baseadas nas informações reais
- Mantém personalidade do desenvolvedor
- Destaca pontos fortes e projetos

## ✅ Checklist de Implementação

### Backend:
- [ ] Instalar dependências Emergent LLM
- [ ] Criar modelos MongoDB para chat
- [ ] Implementar endpoints `/api/chat`
- [ ] Configurar prompt system
- [ ] Implementar gerenciamento de sessão
- [ ] Adicionar tratamento de erros

### Frontend:
- [ ] Substituir mock responses por API calls
- [ ] Implementar gerenciamento de sessão
- [ ] Manter UX/UI existente
- [ ] Adicionar loading states para API
- [ ] Tratamento de erros de rede

### Testes:
- [ ] Testar conversas básicas
- [ ] Verificar persistência de sessão
- [ ] Validar respostas contextuais
- [ ] Testar performance

## 🎯 Resultado Final Esperado
Chatbot inteligente que responde naturalmente sobre:
- Experiência do desenvolvedor
- Detalhes dos projetos
- Motivações e objetivos
- Habilidades técnicas
- Jornada de aprendizado

Mantendo a interface elegante e UX fluida já implementada.