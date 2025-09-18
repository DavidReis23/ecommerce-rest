# backend/app/routes/usuarios.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas  # DESCOMENTAR esta linha

router = APIRouter()

@router.get("/")
def get_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(models.Usuario).all()
    return usuarios

# DESCOMENTAR estas linhas:
@router.post("/")
def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    # Sua lógica aqui
    pass