document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    const cartaoForm = document.getElementById('cartao-form');
    const pixInfo = document.getElementById('pix-info');
    const boletoInfo = document.getElementById('boleto-info');

    // Inicializa a visibilidade dos formulários
    function updatePaymentForms() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        cartaoForm.style.display = 'none';
        pixInfo.style.display = 'none';
        boletoInfo.style.display = 'none';

        if (selectedMethod === 'cartao') {
            cartaoForm.style.display = 'block';
        } else if (selectedMethod === 'pix') {
            pixInfo.style.display = 'block';
        } else if (selectedMethod === 'boleto') {
            boletoInfo.style.display = 'block';
        }
    }

    // Adiciona o event listener para cada opção de pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('change', updatePaymentForms);
    });

    // Inicia a página com a opção padrão selecionada
    updatePaymentForms();

    // Lógica para o botão de confirmação da compra
    const confirmBtn = document.getElementById('confirm-purchase-btn');
    confirmBtn.addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const endereco = document.getElementById('endereco').value;
        const nome = document.getElementById('nome').value;

        if (!nome || !endereco) {
            alert('Por favor, preencha o nome e o endereço para continuar.');
            return;
        }

        alert(`Compra finalizada com sucesso! Pagamento escolhido: ${selectedMethod}. Endereço de entrega: ${endereco}`);

        // Limpa o carrinho após a compra
        localStorage.removeItem('carrinho');
        window.location.href = 'index.html'; // Redireciona para a página principal
    });
});
