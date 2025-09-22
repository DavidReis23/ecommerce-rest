💻 Projeto de E-commerce Web 1

Este é um projeto de **e-commerce** desenvolvido para a disciplina de **Web 1**, com foco na criação de uma aplicação web completa.
O projeto inclui um **back-end robusto em Python** e um **front-end interativo com HTML, CSS e JavaScript**.

🚀 Funcionalidades

* **Autenticação de Usuário**: Sistema de login e cadastro com senha criptografada.
* **Visual Moderno**: Interface de usuário inspirada no Mercado Livre, criada com **Tailwind CSS**.
* **CRUD de Produtos**: Gerenciamento completo de produtos (criar, ler, atualizar, deletar).
* **Filtragem de Produtos**: Filtros por categoria para organizar a exibição.
* **Carrinho de Compras**: Funcionalidade de adicionar produtos a um carrinho local.

🛠️ Tecnologias Utilizadas

## Back-end

**Python**: Linguagem de programação.
**Flask**: Micro-framework web para a API RESTful.
**PostgreSQL**: Banco de dados relacional para persistência.
**Psycopg2**: Adaptador para conexão com o PostgreSQL.
**Flask-Bcrypt**: Criptografia de senhas.
**Flask-CORS**: Permitir requisições de outras origens.

## Front-end

**HTML5**: Estrutura da página.
**Tailwind CSS**: Framework para estilização e design.
**JavaScript**: Lógica de front-end e comunicação com a API.



## ⚙️ Como Rodar o Projeto

### Pré-requisitos

**Python 3.8+**
**PostgreSQL**
* Um cliente de banco de dados (ex: pgAdmin)

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/DavidReis23/ecommerce-rest
   ```

2. **Crie e ative o ambiente virtual**

   ```bash
   cd ecommerce-rest/backend
   python -m venv venv
   # macOS/Linux
   source venv/bin/activate
   # Windows
   venv\Scripts\activate
   ```

3. **Instale as dependências do back-end**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure o banco de dados**

   * Crie um banco de dados chamado **ecommerce\_db** no PostgreSQL.
   * Crie um arquivo **.env** na pasta `backend` com a URL de conexão:

     ```
     DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/ecommerce_db
     ```

5. **Inicie o servidor Flask**

   ```bash
   python app.py
   ```

6. **Acesse o front-end**
   Abra o navegador e acesse:
   [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

   O servidor Flask irá servir as páginas do front-end.
