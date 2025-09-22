document.addEventListener('DOMContentLoaded', () => {
    const carrinhoContainer = document.getElementById('carrinho-container');
    const totalElement = document.getElementById('total-carrinho');

    function exibirCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        carrinhoContainer.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            carrinhoContainer.innerHTML = '<p class="text-gray-500 text-center">O seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.className = 'flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0';
                itemCard.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <span class="text-gray-800 font-semibold">${item.nome}</span>
                        <span class="text-gray-500">x${item.quantidade}</span>
                    </div>
                    <span class="text-gray-800 font-bold">R$ ${(parseFloat(item.preco) * (item.quantidade || 1)).toFixed(2)}</span>
                `;
                carrinhoContainer.appendChild(itemCard);
                total += parseFloat(item.preco) * (item.quantidade || 1);
            });
        }
        totalElement.textContent = total.toFixed(2);
    }

    exibirCarrinho();
});
