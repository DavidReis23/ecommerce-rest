document.addEventListener('DOMContentLoaded', () => {
    const produtosContainer = document.getElementById('produtos-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input'); 
    let todosOsProdutos = [];

    async function fetchProdutos() {
        try {
            const response = await fetch('http://127.0.0.1:5000/produtos');
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            todosOsProdutos = await response.json();

            // Salva a lista de produtos no localStorage para o carrinho consultar o estoque
            localStorage.setItem('todosProdutos', JSON.stringify(todosOsProdutos));

            exibirProdutos(todosOsProdutos);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            produtosContainer.innerHTML = `<p class="text-red-500 font-semibold">Não foi possível carregar os produtos. Erro: ${error.message}</p>`;
        }
    }

    function exibirProdutos(produtos) {
        produtosContainer.innerHTML = '';
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');

        if (!produtos || produtos.length === 0) {
            produtosContainer.innerHTML = '<p class="text-gray-500 text-center col-span-full">Nenhum produto encontrado. Adicione um na página de administrador.</p>';
            return;
        }

        produtos.forEach(produto => {
            // quantidade já no carrinho
            const itemNoCarrinho = carrinhoAtual.find(i => String(i.id) === String(produto.id));
            const quantidadeNoCarrinho = itemNoCarrinho ? Number(itemNoCarrinho.quantidade) : 0;

            const estoqueTotal = Number(produto.estoque || 0);
            const estoqueDisponivel = Math.max(0, estoqueTotal - quantidadeNoCarrinho);
            const isPromocao = produto.categoria && produto.categoria.toLowerCase() === 'promocao';
            const precoNum = Number(produto.preco || 0);

            const produtoCard = document.createElement('div');
            produtoCard.className = 'produto-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transform transition-transform hover:scale-105';

            produtoCard.innerHTML = `
                <div class="p-4 flex flex-col flex-grow">
                    <div class="relative w-full h-48 mb-4">
                        <img src="${produto.imagem_url || ''}" alt="${produto.nome || ''}" class="w-full h-full object-contain">
                        ${isPromocao ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Promoção</span>' : ''}
                    </div>
                    <h3 class="text-lg font-semibold mb-1">${produto.nome || ''}</h3>
                    <p class="text-sm text-gray-500 mb-2">${produto.descricao || ''}</p>
                    <p class="text-sm text-gray-700 mb-2">Estoque disponível: <span class="font-semibold estoque-disponivel">${estoqueDisponivel}</span></p>
                    <div class="mt-auto flex flex-col items-start">
                        ${isPromocao ? `<span class="text-xs text-gray-400 line-through">R$ ${(precoNum * 1.5).toFixed(2)}</span>` : ''}
                        <strong class="text-xl text-blue-600">R$ ${precoNum.toFixed(2)}</strong>
                    </div>
                </div>
                <button 
                    class="add-to-cart bg-blue-600 text-white font-bold py-2 px-4 rounded-b-lg w-full mt-auto hover:bg-blue-700 transition-colors" 
                    data-id="${produto.id}"
                    data-nome="${escapeHtml(produto.nome || '')}"
                    data-preco="${precoNum}"
                    data-imagem="${produto.imagem_url || ''}"
                    ${estoqueDisponivel <= 0 ? 'disabled style="background-color: gray; cursor: not-allowed;"' : ''}>
                    ${estoqueDisponivel <= 0 ? 'Indisponível' : 'Adicionar'}
                </button>
            `;
            produtosContainer.appendChild(produtoCard);
        });

        adicionarListeners();
    }

    function adicionarListeners() {
        const botoesAdicionar = document.querySelectorAll('.add-to-cart');
        botoesAdicionar.forEach(botao => {
            // usa currentTarget/closure para garantir dataset correto
            botao.addEventListener('click', () => {
                const id = botao.getAttribute('data-id');
                const nome = botao.getAttribute('data-nome');
                const preco = botao.getAttribute('data-preco');
                const imagem = botao.getAttribute('data-imagem');
                adicionarAoCarrinho({ id, nome, preco, imagem });
            });
        });
    }

    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const produtoExistente = carrinho.find(item => String(item.id) === String(produto.id));

        // Pega o produto original da lista (do backend)
        const todos = JSON.parse(localStorage.getItem('todosProdutos') || '[]');
        const produtoOriginal = todos.find(p => String(p.id) === String(produto.id));

        const estoqueOriginal = Number(produtoOriginal ? produtoOriginal.estoque : 0);
        const quantidadeAtual = produtoExistente ? Number(produtoExistente.quantidade) : 0;

        if (quantidadeAtual + 1 > estoqueOriginal) {
            alert(`⚠️ Estoque insuficiente! Restam apenas ${estoqueOriginal - quantidadeAtual} unidade(s) disponíveis.`);
            return;
        }

        if (produtoExistente) {
            produtoExistente.quantidade = quantidadeAtual + 1;
        } else carrinho.push({ 
    id: produto.id, 
    nome: produto.nome, 
    preco: Number(produto.preco), 
    imagem: produto.imagem, 
    quantidade: 1,
    estoque: estoqueOriginal   // 👈 agora o carrinho também sabe o estoque
});

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        // Atualiza a tela para refletir o novo estoque disponível (produto.estoque - carrinho)
        exibirProdutos(todosOsProdutos);
        // Feedback pro usuário
        alert(`${produto.nome} adicionado ao carrinho!`);
        console.log('Carrinho atualizado:', carrinho);
    }

    function filtrarProdutos(categoria, termoBusca = '') {
        let produtosFiltrados = todosOsProdutos;

        if (categoria && categoria !== 'Todos') {
            produtosFiltrados = produtosFiltrados.filter(p => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase());
        }

        if (termoBusca) {
            produtosFiltrados = produtosFiltrados.filter(p =>
                (p.nome || '').toLowerCase().includes(termoBusca) ||
                (p.descricao || '').toLowerCase().includes(termoBusca)
            );
        }

        exibirProdutos(produtosFiltrados);
    }

    // listeners de filtro e busca
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const categoria = button.getAttribute('data-categoria');
            filtrarProdutos(categoria);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termoBusca = e.target.value.toLowerCase();
            filtrarProdutos(null, termoBusca);
        });
    }

    // util: evita XSS simples ao inserir nomes no atributo
    function escapeHtml(text) {
        return String(text).replace(/[&<>"']/g, (m) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    }

    // inicializa
    fetchProdutos();
});
