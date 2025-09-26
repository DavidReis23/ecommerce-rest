document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-produto-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome-produto').value;
        const descricao = document.getElementById('descricao-produto').value;
        const preco = document.getElementById('preco-produto').value;
        const estoque = document.getElementById('estoque-produto').value; // CAMPO DE ESTOQUE LIDO
        const categoria = document.getElementById('categoria-produto').value;
        const imagem_url = document.getElementById('imagem-url-produto').value;
        
        // Converte o preço e o estoque para o tipo correto (número)
        const produtoData = {
            nome: nome,
            descricao: descricao,
            preco: parseFloat(preco),
            estoque: parseInt(estoque, 10), // GARANTINDO QUE É UM NÚMERO INTEIRO
            categoria: categoria,
            imagem_url: imagem_url
        };
        
        try {
            const response = await fetch('http://127.0.0.1:5000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtoData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensagem);
                form.reset(); // Limpa o formulário após o sucesso
            } else {
                alert(`Erro: ${data.erro}`);
            }

        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de rede. Verifique se o servidor está rodando.');
        }
    });
});
