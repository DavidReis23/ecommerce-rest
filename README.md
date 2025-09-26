💻 Projeto de E-commerce Web 1
Este é um projeto de e-commerce (marketplace) desenvolvido para a disciplina de Web 1, com foco na criação de uma aplicação web completa e funcional, demonstrando a interligação de tecnologias de back-end e front-end.

O projeto simula uma loja de roupas e tênis, com autenticação de usuário e gerenciamento de estoque em tempo real.

🚀 Funcionalidades Chave
Autenticação de Usuário: Sistema de login e cadastro seguro com senha criptografada (Bcrypt).

CRUD de Produtos: Gerenciamento completo de produtos (Criar, Ler, Atualizar, Deletar).

Controle de Estoque: Verifica a quantidade disponível de produtos no banco de dados e desativa o botão 'Adicionar' quando o estoque chega a zero.

Barra de Pesquisa: Permite a busca dinâmica de produtos por nome e descrição.

Filtragem: Filtros por categoria (Camisas, Tênis, Promoções) para organizar a exibição.

Carrinho de Compras: Funcionalidade de adição de produtos e simulação de Checkout (Endereço e Pagamento).

Visual Moderno: Interface de usuário inspirado em marketplaces, criado com Tailwind CSS.

🛠️ Tecnologias Utilizadas
Back-end (API RESTful)
Tecnologia

Função

Python

Linguagem de programação principal.

Flask

Microframework para construção da API REST.

PostgreSQL

Banco de dados relacional para persistência de dados.

Flask-Bcrypt

Criptografia segura das senhas dos usuários.

Flask-CORS

Permite a comunicação segura entre o Front-end e o Back-end (domínios diferentes).

Front-end (Interface)
Tecnologia

Função

HTML5

Estrutura semântica da aplicação.

JavaScript

Lógica de Front-end, manipulação do DOM e comunicação assíncrona com a API (Fetch API).

Tailwind CSS

Framework de CSS utilitário para estilização e design responsivo.

⚙️ Como Rodar o Projeto Localmente
Pré-requisitos
Python 3.8+

PostgreSQL instalado e rodando.

Um cliente de banco de dados (ex: pgAdmin) para criar o DB e tabelas.

Passos de Inicialização
Clone o Repositório:

git clone [https://github.com/DavidReis23/ecommerce-rest](https://github.com/DavidReis23/ecommerce-rest)
cd ecommerce-rest/backend

Crie e Ative o Ambiente Virtual:

python -m venv venv
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

Crie o arquivo requirements.txt:

Crie um arquivo chamado requirements.txt na pasta backend com o seguinte conteúdo:

Flask
psycopg2-binary
Flask-Bcrypt
python-dotenv
Flask-Cors

Instale as Dependências do Back-end:

pip install -r requirements.txt

Configure o Banco de Dados:

Crie um banco de dados vazio chamado ecommerce_db no PostgreSQL.

No pgAdmin, crie as tabelas produtos e usuarios (e a coluna estoque em produtos).

Crie um arquivo .env na pasta backend com a sua URL de conexão:

DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/ecommerce_db

Inicie o Servidor Flask:

python app.py

Acesse o Front-end:

Abra o navegador e acesse: http://127.0.0.1:5000/

O servidor Flask servirá a página de autenticação.
