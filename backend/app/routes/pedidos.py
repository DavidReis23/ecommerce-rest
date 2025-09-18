# backend/app/routes/pedidos.py  
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/")
def get_pedidos(db: Session = Depends(get_db)):
    pedidos = db.query(models.Pedido).all()
    return pedidos

@router.post("/")
def create_pedido(pedido: schemas.PedidoCreate, db: Session = Depends(get_db)):
    # Lógica para criar pedido (você pode completar depois)
    novo_pedido = models.Pedido(usuario_id=pedido.usuario_id)
    db.add(novo_pedido)
    db.commit()
    db.refresh(novo_pedido)
    return novo_pedido