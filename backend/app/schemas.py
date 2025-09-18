# backend/app/schemas.py (código completo)
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# Usuário
class UsuarioBase(BaseModel):
    nome: str
    email: str

class UsuarioCreate(UsuarioBase):
    senha: str

class Usuario(UsuarioBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Produto
class ProdutoBase(BaseModel):
    nome: str
    preco: float
    categoria: str

class ProdutoCreate(ProdutoBase):
    descricao: Optional[str] = None
    tamanho: Optional[str] = None
    cor: Optional[str] = None
    marca: Optional[str] = None
    imagem_url: Optional[str] = None
    estoque: int = 0

class Produto(ProdutoBase):
    id: int
    descricao: Optional[str]
    tamanho: Optional[str]
    cor: Optional[str]
    marca: Optional[str]
    imagem_url: Optional[str]
    estoque: int
    created_at: datetime

    class Config:
        from_attributes = True

# Pedido
class ItemPedidoBase(BaseModel):
    produto_id: int
    quantidade: int
    preco_unitario: float

class PedidoBase(BaseModel):
    usuario_id: int

class PedidoCreate(PedidoBase):
    itens: List[ItemPedidoBase]

class Pedido(PedidoBase):
    id: int
    status: str
    total: float
    created_at: datetime

    class Config:
        from_attributes = True

# Carrinho
class ItemCarrinhoBase(BaseModel):
    produto_id: int
    quantidade: int

class ItemCarrinho(ItemCarrinhoBase):
    id: int

    class Config:
        from_attributes = True