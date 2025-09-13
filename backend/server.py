from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/api/chat/sessions/{session_id}")
async def get_session_messages(session_id: str):
    return {"messages": sessions.get(session_id, [])}

    
@app.get("/")
async def root():
    return {"message": "Backend está online!"}