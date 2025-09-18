# backend/app/main.py (versão temporária)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base

# Criar tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Loja de Roupas e Tênis", version="1.0.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Comente estas linhas temporariamente:
from .routes import usuarios, produtos, pedidos, carrinho
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(produtos.router, prefix="/produtos", tags=["produtos"])
app.include_router(pedidos.router, prefix="/pedidos", tags=["pedidos"])
app.include_router(carrinho.router, prefix="/carrinho", tags=["carrinho"])

@app.get("/")
def root():
    return {"message": "Bem-vindo à API da Loja de Roupas e Tênis!"}