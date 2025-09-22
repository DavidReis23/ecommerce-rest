import os
import psycopg2
from flask import Flask, jsonify, request, send_from_directory, redirect, url_for
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Inicializa o app Flask
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), '../frontend'))
CORS(app)
bcrypt = Bcrypt(app)

# Configuração de conexão com o banco de dados
DATABASE_URL = os.environ.get('DATABASE_URL')

# Função para conectar ao banco de dados
def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except psycopg2.OperationalError as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

# Rotas de produtos
@app.route('/produtos', methods=['GET'])
def listar_produtos():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'erro': 'Erro de conexão com o banco de dados'}), 500
    cur = conn.cursor()
    cur.execute('SELECT id, nome, descricao, preco, categoria, imagem_url FROM produtos;')
    produtos = cur.fetchall()
    cur.close()
    conn.close()
    lista_produtos = []
    for produto in produtos:
        lista_produtos.append({
            'id': produto[0],
            'nome': produto[1],
            'descricao': produto[2],
            'preco': str(produto[3]),
            'categoria': produto[4],
            'imagem_url': produto[5]
        })
    return jsonify(lista_produtos)

@app.route('/produtos', methods=['POST'])
def adicionar_produto():
    novo_produto = request.get_json()
    if not novo_produto or not 'nome' in novo_produto or not 'preco' in novo_produto:
        return jsonify({'erro': 'Nome e preço são obrigatórios'}), 400
    conn = get_db_connection()
    if conn is None:
        return jsonify({'erro': 'Erro de conexão com o banco de dados'}), 500
    cur = conn.cursor()
    try:
        cur.execute(
            'INSERT INTO produtos (nome, descricao, preco, categoria, imagem_url) VALUES (%s, %s, %s, %s, %s) RETURNING id;',
            (novo_produto['nome'], novo_produto.get('descricao'), novo_produto['preco'], novo_produto.get('categoria'), novo_produto.get('imagem_url'))
        )
        produto_id = cur.fetchone()[0]
        conn.commit()
    except (psycopg2.Error, KeyError) as e:
        conn.rollback()
        return jsonify({'erro': f'Erro ao adicionar produto: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()
    return jsonify({'mensagem': 'Produto adicionado com sucesso!', 'id': produto_id}), 201

@app.route('/produtos/<int:id>', methods=['DELETE'])
def deletar_produto(id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({'erro': 'Erro de conexão com o banco de dados'}), 500
    cur = conn.cursor()
    cur.execute('DELETE FROM produtos WHERE id = %s RETURNING id;', (id,))
    produto_deletado = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if produto_deletado is None:
        return jsonify({'erro': 'Produto não encontrado'}), 404
    return jsonify({'mensagem': 'Produto deletado com sucesso!'}), 200

@app.route('/produtos/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    dados_atualizados = request.get_json()
    conn = get_db_connection()
    if conn is None:
        return jsonify({'erro': 'Erro de conexão com o banco de dados'}), 500
    cur = conn.cursor()
    try:
        sets = []
        valores = []
        if 'nome' in dados_atualizados:
            sets.append("nome = %s")
            valores.append(dados_atualizados['nome'])
        if 'descricao' in dados_atualizados:
            sets.append("descricao = %s")
            valores.append(dados_atualizados['descricao'])
        if 'preco' in dados_atualizados:
            sets.append("preco = %s")
            valores.append(dados_atualizados['preco'])
        if 'categoria' in dados_atualizados:
            sets.append("categoria = %s")
            valores.append(dados_atualizados['categoria'])
        if 'imagem_url' in dados_atualizados:
            sets.append("imagem_url = %s")
            valores.append(dados_atualizados['imagem_url'])
        if not sets:
            return jsonify({'erro': 'Nenhum campo para atualizar'}), 400
        valores.append(id)
        query = f"UPDATE produtos SET {', '.join(sets)} WHERE id = %s RETURNING id;"
        cur.execute(query, tuple(valores))
        produto_atualizado = cur.fetchone()
        conn.commit()
    except (psycopg2.Error, KeyError) as e:
        conn.rollback()
        return jsonify({'erro': f'Erro ao atualizar produto: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()
    if produto_atualizado is None:
        return jsonify({'erro': 'Produto não encontrado'}), 404
    return jsonify({'mensagem': 'Produto atualizado com sucesso!'}), 200

# Rotas de Autenticação
@app.route('/register', methods=['POST'])
def register():
    dados = request.get_json()
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')
    if not nome or not email or not senha:
        return jsonify({'erro': 'Nome, email e senha são obrigatórios'}), 400
    senha_hash = bcrypt.generate_password_hash(senha).decode('utf-8')
    conn = get_db_connection()
    if conn is None:
        return jsonify({'erro': 'Erro de conexão com o banco de dados'}), 500
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s) RETURNING id;", (nome, email, senha_hash))
        user_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({'mensagem': 'Usuário cadastrado com sucesso!', 'id': user_id}), 201
    except psycopg2.IntegrityError:
        conn.rollback()
        return jsonify({'erro': 'Este e-mail já está em uso'}), 409
    except (psycopg2.Error, KeyError) as e:
        conn.rollback()
        return jsonify({'erro': f'Erro ao cadastrar usuário: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    email = dados.get('email')
    senha = dados.get('senha')
    if not email or not senha:
        return jsonify({'erro': 'Email e senha são obrigatórios'}), 400
    conn = get_db_connection()
    if conn is None:
        return jsonify({'erro': 'Erro de conexão com o banco de dados'}), 500
    cur = conn.cursor()
    cur.execute("SELECT id, senha FROM usuarios WHERE email = %s;", (email,))
    usuario = cur.fetchone()
    cur.close()
    conn.close()
    if usuario and bcrypt.check_password_hash(usuario[1], senha):
        return jsonify({'mensagem': 'Login bem-sucedido!', 'id': usuario[0]}), 200
    else:
        return jsonify({'erro': 'Credenciais inválidas'}), 401

# Redireciona a rota principal para a página de autenticação
@app.route('/')
def redirect_to_auth():
    return redirect(url_for('serve_auth'))

# Rotas para servir arquivos HTML
@app.route('/auth')
def serve_auth():
    return send_from_directory(app.static_folder, 'auth.html')

@app.route('/admin')
def serve_admin():
    return send_from_directory(app.static_folder, 'admin.html')

@app.route('/index')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Rota para servir todos os arquivos estáticos (CSS, JS, imagens, etc.)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
