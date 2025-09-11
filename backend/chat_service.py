import os
from models import ChatSession, ChatMessage
from datetime import datetime
import logging
import openai
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🔄 App iniciando...")
    # Aqui você pode conectar ao MongoDB, por exemplo
    yield
    print("🛑 App encerrando...")
    # Aqui você pode fechar conexões, limpar cache, etc.

app = FastAPI(lifespan=lifespan)


logger = logging.getLogger(__name__)

class ChatService:
    def __init__(self, db):
        self.db = db
        load_dotenv()
        self.api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.api_key

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

4. **Site Gerador de link para WhatsApp Comercial**
    - Foco na Usabilidade: o projeto foi desenvolvido para ser simples e intuitivo, permitindo que usuário com nenhuma experiência técnica criem link
    - Aprendizado e aplicação: A experiência me permitiu aplicar conceitos de desenvolvimento web em tempo real, transformando teoria em produto real
    - Impacto comercial: A ferramenta otimiza o fluxo de contato entre empresas e consumidores, eliminando a necessidade de salvar números manualmente

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

    def send_message_to_openai(self, message: str) -> str:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": self.system_message},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message["content"]

    async def get_or_create_session(self, session_id: str = None) -> ChatSession:
        """Busca uma sessão existente ou cria uma nova"""
        if session_id:
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

    async def process_message(self, session_id: str, message: str) -> str:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": self.system_message},
                    {"role": "user", "content": message}
                ]
            )
            ai_response = response.choices[0].message["content"]

            # Salva no MongoDB
            self.db["chat_messages"].insert_one({
                "session_id": session_id,
                "user_message": message,
                "ai_response": ai_response,
                "timestamp": datetime.utcnow()
            })

            return ai_response

        except Exception as e:
            logger.error(f"Erro ao processar mensagem: {str(e)}")
            resposta_fallback = (
                "Desculpe, ocorreu um problema técnico. Mas posso te contar que sou um "
                "desenvolvedor júnior apaixonado por transformar ideias em código! "
                "Tenho 3 projetos principais e estou sempre aprendendo. O que você gostaria de saber?"
            )
            return resposta_fallback

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