💻 Projeto de E-commerce Web 1
Este é um projeto de e-commerce desenvolvido para a disciplina de Web 1, com foco na criação de uma aplicação web completa. O projeto inclui um back-end robusto em Python e um front-end interativo com HTML, CSS e JavaScript.

🚀 Funcionalidades
Autenticação de Usuário: Sistema de login e cadastro com senha criptografada.

Visual Moderno: Interface de usuário inspirada no Mercado Livre, criada com Tailwind CSS.

CRUD de Produtos: Gerenciamento completo de produtos (criar, ler, atualizar, deletar).

Filtragem de Produtos: Filtros por categoria para organizar a exibição dos produtos.

Carrinho de Compras: Funcionalidade de adicionar produtos a um carrinho local.

🛠️ Tecnologias Utilizadas
Back-end
Python: Linguagem de programação.

Flask: Micro-framework web para a API RESTful.

PostgreSQL: Banco de dados relacional para persistência de dados.

Psycopg2: Adaptador para conexão com o PostgreSQL.

Flask-Bcrypt: Biblioteca para criptografia de senhas.

Flask-CORS: Extensão para permitir requisições de outras origens.

Front-end
HTML5: Estrutura da página.

Tailwind CSS: Framework para estilização e design.

JavaScript: Lógica de front-end e comunicação com a API.

⚙️ Como Rodar o Projeto
Pré-requisitos
Python 3.8+

PostgreSQL

Um cliente de banco de dados (como o pgAdmin)

Passos
Clone o repositório:

git clone [https://github.com/DavidReis23/ecommerce-rest](https://github.com/DavidReis23/ecommerce-rest)

Crie e ative o ambiente virtual:

cd ecommerce-rest/backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate      # Windows

Instale as dependências do back-end:

pip install -r requirements.txt

Configure o banco de dados:

Crie um banco de dados chamado ecommerce_db no PostgreSQL.

Crie um arquivo .env na pasta backend com a sua URL de conexão.

DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/ecommerce_db

Inicie o servidor Flask:

python app.py

Acesse o front-end:

Abra o seu navegador e acesse a URL:

[http://127.0.0.1:5000/](http://127.0.0.1:5000/)

O servidor Flask irá servir as páginas do front-end.
