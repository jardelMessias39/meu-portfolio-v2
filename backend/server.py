from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import ChatSession
from chat_service import ChatService

from motor.motor_asyncio import AsyncIOMotorClient


app = FastAPI()

# Libera acesso externo (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota para Health Check (adicione essa)
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Rota para status da API (a que você já tem)
@app.get("/api/status")
async def get_status():
    return {"status": "online"}

# Armazena sessões em memória (temporário)
sessions = {}

@app.post("/api/chat")
async def chat_endpoint(request: dict = Body(...)):
    message = request.get("message", "")
    session_id = request.get("session_id", "default")

    if session_id not in sessions:
        sessions[session_id] = []

    sessions[session_id].append({"role": "user", "content": message})
    response = f"Você disse: {message}"
    sessions[session_id].append({"role": "assistant", "content": response})

    return {"response": response, "session_id": session_id}

# Supondo que você já tenha o banco configurado
from motor.motor_asyncio import AsyncIOMotorClient
db = AsyncIOMotorClient("mongodb://localhost:27017")["chat_db"]
chat_service = ChatService(db)

@app.get("/api/chat/sessions/{session_id}", response_model=ChatSession)
async def get_session_messages(session_id: str):
    session = await chat_service.get_session_history(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Sessão não encontrada")
    return session

    
@app.get("/")
async def root():
    return {"message": "Backend está online!"}