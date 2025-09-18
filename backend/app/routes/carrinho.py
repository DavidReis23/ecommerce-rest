# backend/app/routes/carrinho.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/")
def get_carrinho(db: Session = Depends(get_db)):
    itens = db.query(models.ItemCarrinho).all()
    return itens

@router.post("/")
def adicionar_carrinho(item: schemas.ItemCarrinhoBase, db: Session = Depends(get_db)):
    novo_item = models.ItemCarrinho(**item.dict(), usuario_id=1)
    db.add(novo_item)
    db.commit()
    db.refresh(novo_item)
    return novo_item