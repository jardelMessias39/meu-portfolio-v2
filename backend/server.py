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

@app.post("/api/chat")
async def chat_endpoint(request: dict = Body(...)):
    message = request.get("message", "")
    return {"response": f"Você disse: {message}"}
    
@app.get("/")
async def root():
    return {"message": "Backend está online!"}