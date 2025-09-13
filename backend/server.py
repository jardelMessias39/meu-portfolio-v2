from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (libera acesso externo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
api_router = APIRouter(prefix="/api")

@api_router.get("/status")
async def get_status():
    return {"status": "online"}

app.include_router(api_router)
