// Configurações da API
const API_URL = 'http://localhost:8000';

// Estado da aplicação
let carrinho = [];
let produtos = [];

// Elementos do DOM
const produtosContainer = document.getElementById('produtos-container');
const carrinhoBtn = document.getElementById('carrinho-btn');
const carrinhoCount = document.getElementById('carrinho-count');
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');
const filterBtn = document.querySelector('.filter-btn');

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando DRL PureStyle...');
    carregarProdutosMelhorado();
    carregarCarrinho();
    
    // Event Listeners
    if (carrinhoBtn) carrinhoBtn.addEventListener('click', verCarrinho);
    if (searchBtn) searchBtn.addEventListener('click', buscarProdutos);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') buscarProdutos();
        });
    }
    if (filterBtn) filterBtn.addEventListener('click', aplicarFiltros);
});

// ==================== FUNÇÕES DE API ====================
async function verificarAPI() {
    try {
        const response = await fetch(`${API_URL}/`, { 
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.log('❌ API offline:', error);
        return false;
    }
}

async function carregarProdutosMelhorado() {
    console.log('📦 Tentando carregar produtos...');
    
    const apiOnline = await verificarAPI();
    
    if (apiOnline) {
        console.log('✅ API online! Buscando produtos...');
        try {
            const response = await fetch(`${API_URL}/produtos/`);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            produtos = await response.json();
            console.log(`✅ ${produtos.length} produtos carregados da API`);
            exibirProdutos(produtos);
            
        } catch (error) {
            console.error('❌ Erro ao carregar produtos da API:', error);
            usarProdutosExemplo();
        }
    } else {
        console.log('⚠️ API offline. Usando produtos de exemplo...');
        usarProdutosExemplo();
    }
}

function usarProdutosExemplo() {
    produtos = [
        {
            id: 1,
            nome: "Camiseta Básica",
            descricao: "Camiseta 100% algodão",
            preco: 49.90,
            categoria: "Camisetas",
            tamanho: "M",
            cor: "Preta",
            marca: "DRL",
            estoque: 50,
            imagem_url: null
        },
        {
            id: 2,
            nome: "Calça Jeans",
            descricao: "Calça jeans masculina",
            preco: 129.90,
            categoria: "Calças",
            tamanho: "42",
            cor: "Azul",
            marca: "PureStyle",
            estoque: 30,
            imagem_url: null
        },
        {
            id: 3,
            nome: "Tênis Casual",
            descricao: "Tênis confortável para dia a dia",
            preco: 199.90,
            categoria: "Tênis",
            tamanho: "42",
            cor: "Branco",
            marca: "StyleFoot",
            estoque: 25,
            imagem_url: null
        },
        {
            id: 4,
            nome: "Boné Aba Curva",
            descricao: "Boné com proteção UV",
            preco: 39.90,
            categoria: "Acessórios",
            tamanho: "Único",
            cor: "Preto",
            marca: "DRL",
            estoque: 40,
            imagem_url: null
        },
        {
            id: 5,
            nome: "Blusa de Moletom",
            descricao: "Blusa quente e confortável",
            preco: 89.90,
            categoria: "Camisetas",
            tamanho: "G",
            cor: "Cinza",
            marca: "PureStyle",
            estoque: 35,
            imagem_url: null
        }
    ];
    exibirProdutos(produtos);
}

// ==================== EXIBIÇÃO DE PRODUTOS ====================
function exibirProdutos(produtosParaExibir) {
    if (!produtosContainer) {
        console.error('❌ Container de produtos não encontrado!');
        return;
    }
    
    produtosContainer.innerHTML = '';
    
    if (produtosParaExibir.length === 0) {
        produtosContainer.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }
    
    console.log(`🖼️ Exibindo ${produtosParaExibir.length} produtos`);
    
    produtosParaExibir.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.className = 'produto-card';
        produtoCard.innerHTML = `
            <div class="produto-imagem">
                ${produto.imagem_url ? 
                    `<img src="${produto.imagem_url}" alt="${produto.nome}" onerror="this.style.display='none'">` : 
                    '<div class="sem-imagem">📷</div>'}
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria || 'Geral'}</span>
                <h3 class="produto-nome">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao || 'Sem descrição'}</p>
                <p class="produto-preco">R$ ${produto.preco?.toFixed(2).replace('.', ',') || '0,00'}</p>
                <div class="produto-actions">
                    <button class="btn btn-sm" onclick="adicionarAoCarrinho(${produto.id})">
                        🛒 Adicionar
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="detalhesProduto(${produto.id})">
                        🔍 Detalhes
                    </button>
                </div>
            </div>
        `;
        produtosContainer.appendChild(produtoCard);
    });
}

// ==================== BUSCA E FILTROS ====================
function buscarProdutos() {
    if (!searchInput) return;
    
    const termo = searchInput.value.toLowerCase().trim();
    console.log(`🔍 Buscando: "${termo}"`);
    
    if (termo === '') {
        exibirProdutos(produtos);
        return;
    }
    
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo) || 
        (produto.descricao && produto.descricao.toLowerCase().includes(termo)) ||
        (produto.categoria && produto.categoria.toLowerCase().includes(termo)) ||
        (produto.marca && produto.marca.toLowerCase().includes(termo))
    );
    
    console.log(`✅ Encontrados ${produtosFiltrados.length} produtos na busca`);
    exibirProdutos(produtosFiltrados);
}

function aplicarFiltros() {
    console.log('🎯 Aplicando filtros...');
    
    const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value.toLowerCase().trim());
    
    const faixaPreco = document.querySelector('input[name="price"]:checked')?.value;
    
    let produtosFiltrados = produtos;
    
    // Filtrar por categoria - CORRIGIDO
    if (categoriasSelecionadas.length > 0) {
        console.log('🏷️ Filtrando por categorias:', categoriasSelecionadas);
        produtosFiltrados = produtosFiltrados.filter(produto => {
            const categoriaProduto = produto.categoria?.toLowerCase().trim() || '';
            return categoriasSelecionadas.some(categoria => 
                categoriaProduto.includes(categoria)
            );
        });
    }
    
    // Filtrar por preço
    if (faixaPreco) {
        console.log('💰 Filtrando por faixa de preço:', faixaPreco);
        const [min, max] = faixaPreco.split('-').map(val => val === '+' ? Infinity : Number(val));
        produtosFiltrados = produtosFiltrados.filter(produto => {
            if (max === Infinity) return produto.preco >= min;
            return produto.preco >= min && produto.preco <= max;
        });
    }
    
    console.log(`✅ ${produtosFiltrados.length} produtos após filtros`);
    exibirProdutos(produtosFiltrados);
}

// ==================== CARRINHO ====================
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    
    if (!produto) {
        exibirMensagemErro('Produto não encontrado.');
        return;
    }
    
    const itemExistente = carrinho.find(item => item.produtoId === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            imagem: produto.imagem_url
        });
    }
    
    salvarCarrinho();
    atualizarContadorCarrinho();
    exibirMensagemSucesso(`${produto.nome} adicionado ao carrinho!`);
}

function verCarrinho() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    let mensagem = '🛒 Seu Carrinho:\n\n';
    carrinho.forEach(item => {
        mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
    });
    mensagem += `\n💵 Total: R$ ${calcularTotalCarrinho().toFixed(2).replace('.', ',')}`;
    
    alert(mensagem);
}

function detalhesProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    
    if (!produto) {
        exibirMensagemErro('Produto não encontrado.');
        return;
    }
    
    let mensagem = `📋 ${produto.nome}\n\n`;
    mensagem += `💰 Preço: R$ ${produto.preco.toFixed(2).replace('.', ',')}\n`;
    mensagem += `📦 Estoque: ${produto.estoque} unidades\n`;
    if (produto.categoria) mensagem += `🏷️ Categoria: ${produto.categoria}\n`;
    if (produto.marca) mensagem += `🏭 Marca: ${produto.marca}\n`;
    if (produto.tamanho) mensagem += `📏 Tamanho: ${produto.tamanho}\n`;
    if (produto.cor) mensagem += `🎨 Cor: ${produto.cor}\n`;
    if (produto.descricao) mensagem += `\n📝 Descrição: ${produto.descricao}`;
    
    alert(mensagem);
}

function calcularTotalCarrinho() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function atualizarContadorCarrinho() {
    if (!carrinhoCount) return;
    
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    carrinhoCount.textContent = totalItens;
    carrinhoCount.style.display = totalItens > 0 ? 'block' : 'none';
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    try {
        const carrinhoSalvo = localStorage.getItem('carrinho');
        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
            atualizarContadorCarrinho();
        }
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        carrinho = [];
    }
}

// ==================== UTILITÁRIOS ====================
function exibirMensagemSucesso(mensagem) {
    alert('✅ ' + mensagem);
}

function exibirMensagemErro(mensagem) {
    alert('❌ ' + mensagem);
}

// ==================== AUTO-RECARGA ====================
// Recarrega os produtos a cada 30 segundos se tiver poucos
setInterval(() => {
    if (produtos.length < 3) {
        console.log('🔄 Poucos produtos, tentando recarregar...');
        carregarProdutosMelhorado();
    }
}, 30000);

// Tenta reconectar com API a cada 10 segundos se offline
setInterval(async () => {
    const apiOnline = await verificarAPI();
    if (!apiOnline && produtos.length < 5) {
        console.log('🔁 Tentando reconectar com API...');
        carregarProdutosMelhorado();
    }
}, 10000);