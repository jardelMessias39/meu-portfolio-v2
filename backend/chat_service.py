import os
from emergentintegrations.llm.chat import LlmChat, UserMessage
from models import ChatSession, ChatMessage
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class ChatService:
    def __init__(self, db):
        self.db = db
        self.api_key = "sk-emergent-d205345A6BbDd2430C"
        
        # Contexto detalhado sobre o desenvolvedor em português
        self.system_message = """Você é o assistente virtual do portfólio de um desenvolvedor júnior full stack brasileiro.

INFORMAÇÕES DO DESENVOLVEDOR:
- Nome: Desenvolvedor Full Stack
- Início na programação: 1 de junho de 2025
- Empresa atual: DevClub (desde junho 2025)
- Formação: Licenciatura em Informática pela UNIT (formado em 2019)
- Tecnologias atuais: HTML, CSS, JavaScript
- Próximos estudos: React e Node.js

PROJETOS DESENVOLVIDOS:
1. **Jogo Embaralhado**
   - Quebra-cabeça interativo onde o usuário escolhe uma imagem e define em quantas partes quer dividi-la
   - Funcionalidades: cronômetro, música de fundo relaxante, diferentes níveis de dificuldade
   - Objetivo: desenvolver concentração e percepção aos detalhes
   - Tecnologias: HTML, CSS, JavaScript

2. **Chuva de Palavras**
   - Jogo de digitação onde palavras pré-selecionadas caem na tela
   - O usuário deve digitá-las rapidamente antes que toquem o final da tela
   - A velocidade aumenta após um certo número de acertos
   - Layout simples e moderno para manter o foco
   - Objetivo: desenvolver agilidade, coordenação motora e velocidade de digitação
   - Tecnologias: HTML, CSS, JavaScript

3. **Site de Turismo Acessível**
   - Plataforma que oferece opções de locais para viajar e aventuras
   - GRANDE DIFERENCIAL: Foco total em acessibilidade
   - Funcionalidades especiais: descrições visuais e auditivas, indicação de locais com rampas, suporte para braile
   - Público-alvo: todas as pessoas, especialmente com necessidades especiais
   - Objetivo: democratizar o turismo e torná-lo acessível para todos
   - Tecnologias: HTML, CSS, JavaScript

PERSONALIDADE E MOTIVAÇÃO:
- Pessoa tranquila que sempre corre atrás dos objetivos
- GRANDE PAIXÃO: Ver códigos se transformarem em algo visual e funcional
- Fascínio pela lógica por trás dos sites e aplicações
- Filosofia: "Ninguém nasce sabendo" - sempre em busca de conhecimento
- Motivação principal: capacidade de transformar ideias em realidade através do código

OBJETIVOS DE CARREIRA:
- Se tornar um bom programador e profissional
- Participar de equipes que fazem a diferença no mundo
- Desenvolver projetos que melhorem a vida das pessoas
- Trazer mais produtividade através da tecnologia
- Fazer parte de grupos que criam soluções impactantes

VALORES IMPORTANTES:
- ACESSIBILIDADE: Todos os projetos têm preocupação com inclusão
- IMPACTO SOCIAL: Quer que seus projetos melhorem a vida das pessoas
- APRENDIZADO CONTÍNUO: Sempre estudando e se aprimorando
- DETERMINAÇÃO: Corre atrás dos objetivos com tranquilidade e foco

INSTRUÇÕES DE RESPOSTA:
- SEMPRE responda em português brasileiro
- Seja entusiasmado mas profissional
- Destaque os aspectos únicos como foco em acessibilidade
- Mostre a paixão por transformar código em soluções visuais
- Enfatize a jornada de aprendizado e determinação
- Seja específico sobre os projetos quando perguntado
- Mantenha um tom conversacional e amigável
- Destaque sempre o desejo de fazer a diferença através da programação
- Use linguagem simples e clara
- Evite termos técnicos em inglês sem explicação"""

    async def create_chat_instance(self, session_id: str) -> LlmChat:
        """Cria uma nova instância de chat para cada sessão"""
        chat = LlmChat(
            api_key=self.api_key,
            session_id=session_id,
            system_message=self.system_message
        )
        # Usar GPT-4o conforme solicitado
        chat.with_model("openai", "gpt-4o")
        return chat

    async def get_or_create_session(self, session_id: str = None) -> ChatSession:
        """Busca uma sessão existente ou cria uma nova"""
        if session_id:
            # Tentar buscar sessão existente
            session_data = await self.db.chat_sessions.find_one({"session_id": session_id})
            if session_data:
                # Converter dados do MongoDB para o modelo
                messages = [
                    ChatMessage(**msg) for msg in session_data.get("messages", [])
                ]
                return ChatSession(
                    session_id=session_data["session_id"],
                    created_at=session_data["created_at"],
                    updated_at=session_data["updated_at"],
                    messages=messages
                )
        
        # Criar nova sessão
        new_session = ChatSession()
        await self.db.chat_sessions.insert_one(new_session.dict())
        return new_session

    async def save_session(self, session: ChatSession):
        """Salva a sessão no MongoDB"""
        session.updated_at = datetime.utcnow()
        await self.db.chat_sessions.update_one(
            {"session_id": session.session_id},
            {"$set": session.dict()},
            upsert=True
        )

    async def process_message(self, message: str, session_id: str = None) -> tuple[str, str]:
        """Processa uma mensagem e retorna a resposta da IA"""
        try:
            # Obter ou criar sessão
            session = await self.get_or_create_session(session_id)
            
            # Adicionar mensagem do usuário
            user_message = ChatMessage(role="user", content=message)
            session.messages.append(user_message)
            
            # Criar instância do chat
            chat = await self.create_chat_instance(session.session_id)
            
            # Enviar mensagem para a IA
            user_msg = UserMessage(text=message)
            ai_response = await chat.send_message(user_msg)
            
            # Adicionar resposta da IA
            ai_message = ChatMessage(role="assistant", content=ai_response)
            session.messages.append(ai_message)
            
            # Salvar sessão
            await self.save_session(session)
            
            logger.info(f"Processed message for session {session.session_id}")
            return ai_response, session.session_id
            
        except Exception as e:
            logger.error(f"Erro ao processar mensagem: {str(e)}")
            # Resposta de fallback em caso de erro
            resposta_fallback = (
                "Desculpe, ocorreu um problema técnico. Mas posso te contar que sou um "
                "desenvolvedor júnior apaixonado por transformar ideias em código! "
                "Tenho 3 projetos principais e estou sempre aprendendo. O que você gostaria de saber?"
            )
            return resposta_fallback, session_id or "error-session"

    async def get_session_history(self, session_id: str) -> ChatSession:
        """Retorna o histórico de uma sessão"""
        session_data = await self.db.chat_sessions.find_one({"session_id": session_id})
        if session_data:
            messages = [
                ChatMessage(**msg) for msg in session_data.get("messages", [])
            ]
            return ChatSession(
                session_id=session_data["session_id"],
                created_at=session_data["created_at"],
                updated_at=session_data["updated_at"],
                messages=messages
            )
        return None