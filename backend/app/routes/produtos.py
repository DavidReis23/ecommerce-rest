# backend/app/routes/produtos.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/")
def get_produtos(db: Session = Depends(get_db)):
    produtos = db.query(models.Produto).all()
    return produtos

@router.post("/")
def create_produto(produto: schemas.ProdutoCreate, db: Session = Depends(get_db)):
    novo_produto = models.Produto(**produto.dict())
    db.add(novo_produto)
    db.commit()
    db.refresh(novo_produto)
    return novo_produto