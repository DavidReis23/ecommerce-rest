# backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    senha = Column(String(255), nullable=False)  # Aumentado para 255 para hash
    created_at = Column(DateTime, default=datetime.utcnow)
    
    pedidos = relationship("Pedido", back_populates="usuario", cascade="all, delete-orphan")
    itens_carrinho = relationship("ItemCarrinho", back_populates="usuario", cascade="all, delete-orphan")

class Produto(Base):
    __tablename__ = "produtos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    descricao = Column(Text)
    preco = Column(Numeric(10, 2), nullable=False)  # Alterado para Numeric (melhor para dinheiro)
    categoria = Column(String(50), nullable=False)
    tamanho = Column(String(10))
    cor = Column(String(30))
    marca = Column(String(50))
    imagem_url = Column(String(255))
    estoque = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    itens_pedido = relationship("ItemPedido", back_populates="produto", cascade="all, delete-orphan")
    itens_carrinho = relationship("ItemCarrinho", back_populates="produto", cascade="all, delete-orphan")

class Pedido(Base):
    __tablename__ = "pedidos"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"))
    status = Column(String(20), default="pendente")
    total = Column(Numeric(10, 2), default=0.0)  # Alterado para Numeric
    created_at = Column(DateTime, default=datetime.utcnow)
    
    usuario = relationship("Usuario", back_populates="pedidos")
    itens_pedido = relationship("ItemPedido", back_populates="pedido", cascade="all, delete-orphan")

class ItemPedido(Base):
    __tablename__ = "itens_pedido"
    
    id = Column(Integer, primary_key=True, index=True)
    pedido_id = Column(Integer, ForeignKey("pedidos.id", ondelete="CASCADE"))
    produto_id = Column(Integer, ForeignKey("produtos.id", ondelete="CASCADE"))
    quantidade = Column(Integer, default=1)
    preco_unitario = Column(Numeric(10, 2), nullable=False)  # Alterado para Numeric
    
    pedido = relationship("Pedido", back_populates="itens_pedido")
    produto = relationship("Produto", back_populates="itens_pedido")

class ItemCarrinho(Base):
    __tablename__ = "carrinho"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"))
    produto_id = Column(Integer, ForeignKey("produtos.id", ondelete="CASCADE"))
    quantidade = Column(Integer, default=1)
    
    usuario = relationship("Usuario", back_populates="itens_carrinho")
    produto = relationship("Produto", back_populates="itens_carrinho")