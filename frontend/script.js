document.addEventListener('DOMContentLoaded', () => {
    const produtosContainer = document.getElementById('produtos-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let todosProdutos = [];

    async function fetchProdutos() {
        try {
            const response = await fetch('http://127.0.0.1:5000/produtos');
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            todosProdutos = await response.json();
            exibirProdutos(todosProdutos);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            produtosContainer.innerHTML = `<p class="text-red-500 font-semibold">Não foi possível carregar os produtos. Erro: ${error.message}</p>`;
        }
    }

    function exibirProdutos(produtos) {
        produtosContainer.innerHTML = '';
        if (produtos.length === 0) {
            produtosContainer.innerHTML = '<p class="text-gray-500 text-center col-span-full">Nenhum produto encontrado nesta categoria.</p>';
        } else {
            produtos.forEach(produto => {
                const produtoCard = document.createElement('div');
                produtoCard.className = 'produto-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transform transition-transform hover:scale-105';
                
                const isPromocao = produto.categoria && produto.categoria.toLowerCase() === 'promocao';
                
                produtoCard.innerHTML = `
                    <div class="p-4 flex flex-col flex-grow">
                        <div class="relative w-full h-48 mb-4">
                            <img src="${produto.imagem_url}" alt="${produto.nome}" class="w-full h-full object-contain">
                            ${isPromocao ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Promoção</span>' : ''}
                        </div>
                        <h3 class="text-lg font-semibold mb-1">${produto.nome}</h3>
                        <p class="text-sm text-gray-500 mb-2">${produto.descricao}</p>
                        <div class="mt-auto flex flex-col items-start">
                            ${isPromocao ? `<span class="text-xs text-gray-400 line-through">R$ ${parseFloat(produto.preco * 1.5).toFixed(2)}</span>` : ''}
                            <strong class="text-xl text-blue-600">R$ ${produto.preco}</strong>
                        </div>
                    </div>
                    <button class="add-to-cart bg-blue-600 text-white font-bold py-2 px-4 rounded-b-lg w-full mt-auto hover:bg-blue-700 transition-colors"
                        data-id="${produto.id}" 
                        data-nome="${produto.nome}" 
                        data-preco="${produto.preco}" 
                        data-imagem="${produto.imagem_url}">
                        Adicionar
                    </button>
                `;
                produtosContainer.appendChild(produtoCard);
            });
            adicionarListeners();
        }
    }

    function adicionarListeners() {
        const botoesAdicionar = document.querySelectorAll('.add-to-cart');
        botoesAdicionar.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nome = e.target.getAttribute('data-nome');
                const preco = e.target.getAttribute('data-preco');
                const imagem = e.target.getAttribute('data-imagem');
                adicionarAoCarrinho({ id, nome, preco, imagem });
            });
        });
    }

    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const produtoExistente = carrinho.find(item => item.id === produto.id);

        if (produtoExistente) {
            produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert(`${produto.nome} adicionado ao carrinho!`);
        console.log('Carrinho atualizado:', carrinho);
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const categoria = button.getAttribute('data-categoria');
            let produtosFiltrados = [];
            
            if (categoria === 'Todos') {
                produtosFiltrados = todosProdutos;
            } else {
                produtosFiltrados = todosProdutos.filter(p => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase());
            }
            
            exibirProdutos(produtosFiltrados);
        });
    });

    fetchProdutos();
});
