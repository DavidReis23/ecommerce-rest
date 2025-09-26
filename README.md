# 💻 Projeto de E-commerce Web 1

Este é um projeto de **e-commerce (marketplace)** desenvolvido para a disciplina de **Web 1**, com foco na criação de uma aplicação web completa e funcional, demonstrando a interligação de tecnologias de **back-end** e **front-end**.  

O projeto simula uma loja de **roupas e tênis**, com autenticação de usuário e gerenciamento de estoque em tempo real.  

---

## 🚀 Funcionalidades

- 🔐 **Autenticação de Usuário**: login e cadastro seguro com senha criptografada (`Bcrypt`).
- 🛍️ **CRUD de Produtos**: Criar, Ler, Atualizar e Deletar produtos.
- 📦 **Controle de Estoque**: atualização em tempo real e bloqueio de compras quando esgota.
- 🔎 **Barra de Pesquisa**: busca dinâmica por nome e descrição.
- 🏷️ **Filtragem**: por categoria (Camisas, Tênis, Promoções).
- 🛒 **Carrinho de Compras**: adição de produtos e simulação de checkout (endereço e pagamento).
- 🎨 **Visual Moderno**: interface inspirada em marketplaces, feita com **Tailwind CSS**.

---

## 🛠️ Tecnologias Utilizadas

### 🔙 Back-end (API RESTful)
| Tecnologia     | Função |
|----------------|--------|
| **Python**     | Linguagem principal |
| **Flask**      | Microframework para API REST |
| **PostgreSQL** | Banco de dados relacional |
| **Flask-Bcrypt** | Criptografia de senhas |
| **Flask-CORS** | Comunicação entre front e back |

### 🎨 Front-end (Interface)
| Tecnologia       | Função |
|------------------|--------|
| **HTML5**        | Estrutura semântica |
| **JavaScript**   | Lógica de front, DOM e fetch API |
| **Tailwind CSS** | Estilização e design responsivo |

---

## ⚙️ Como Rodar o Projeto Localmente

### ✅ Pré-requisitos
- Python **3.8+**
- PostgreSQL instalado e rodando
- Cliente de banco de dados (ex: pgAdmin)

### 🚦 Passos

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/DavidReis23/ecommerce-rest
   cd ecommerce-rest/backend


2. **Crie e Ative o Ambiente Virtual**
python -m venv venv
# macOS/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

3. **Crie o arquivo requirements.txt**
Flask
psycopg2-binary
Flask-Bcrypt
python-dotenv
Flask-Cors

4. **Instale as Dependências**
pip install -r requirements.txt

5. **Configure o Banco de Dados**
Crie um banco chamado ecommerce_db
Crie as tabelas produtos e usuarios (com a coluna estoque em produtos)
Crie um arquivo .env no backend com:
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/ecommerce_db

6. **Inicie o Servidor Flask**
python app.py

7. **Acesse o Front-end**
http://127.0.0.1:5000/
