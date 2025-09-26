document.addEventListener('DOMContentLoaded', () => {
    const carrinhoContainer = document.getElementById('carrinho-itens-container');
    const carrinhoTotalSpan = document.getElementById('carrinho-total');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');

    function carregarCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        carrinhoContainer.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            carrinhoContainer.innerHTML = '<p class="text-gray-500 text-center">Seu carrinho está vazio.</p>';
            carrinhoTotalSpan.textContent = `R$ 0.00`;
            finalizarCompraBtn.disabled = true;
            return;
        }
        
        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between border-b py-4 last:border-b-0';
            
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            itemElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.imagem}" alt="${item.nome}" class="w-16 h-16 object-cover rounded-lg">
                    <div>
                        <p class="font-semibold">${item.nome}</p>
                        <p class="text-sm text-gray-600">Preço: R$ ${item.preco}</p>
                        <p class="text-xs text-gray-500">Estoque: ${item.estoque}</p>
                        <div class="flex items-center mt-2">
                            <button class="remover-unidade-btn bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 hover:bg-gray-300 transition-colors" data-id="${item.id}">-</button>
                            <span class="text-gray-800">Qtd: ${item.quantidade}</span>
                            <button class="adicionar-unidade-btn bg-gray-200 text-gray-800 px-2 py-1 rounded-full ml-2 hover:bg-gray-300 transition-colors" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-end space-y-2">
                    <p class="font-bold">R$ ${subtotal.toFixed(2)}</p>
                    <button class="remover-item-btn text-red-500 font-semibold text-sm hover:underline transition-colors" data-id="${item.id}">Remover</button>
                </div>
            `;
            carrinhoContainer.appendChild(itemElement);
        });

        carrinhoTotalSpan.textContent = `R$ ${total.toFixed(2)}`;
        finalizarCompraBtn.disabled = false;
        
        adicionarListeners();
    }

    function adicionarListeners() {
        const removerItemBtns = document.querySelectorAll('.remover-item-btn');
        removerItemBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                removerItem(id);
            });
        });

        const removerUnidadeBtns = document.querySelectorAll('.remover-unidade-btn');
        removerUnidadeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                atualizarQuantidade(id, -1);
            });
        });

        const adicionarUnidadeBtns = document.querySelectorAll('.adicionar-unidade-btn');
        adicionarUnidadeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                atualizarQuantidade(id, 1);
            });
        });
        
        finalizarCompraBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    function removerItem(id) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        carrinho = carrinho.filter(item => item.id !== id);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    }
    
    function atualizarQuantidade(id, valor) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        const item = carrinho.find(p => p.id === id);
        
        if (item) {
            const novaQuantidade = (item.quantidade || 1) + valor;

            if (novaQuantidade > 0) {
                if (novaQuantidade > item.estoque) {
                    alert(`⚠️ Estoque insuficiente! Só temos ${item.estoque} unidades.`);
                    return;
                }
                item.quantidade = novaQuantidade;
            } else {
                removerItem(id);
                return;
            }
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    }

    carregarCarrinho();
});
