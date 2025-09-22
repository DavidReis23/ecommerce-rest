document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#login-form').parentNode.style.display = 'none';
        document.querySelector('#register-form').parentNode.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#login-form').parentNode.style.display = 'block';
        document.querySelector('#register-form').parentNode.style.display = 'none';
    });

    // Lógica de cadastro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('register-nome').value;
        const email = document.getElementById('register-email').value;
        const senha = document.getElementById('register-senha').value;
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.mensagem);
                showLoginLink.click();
            } else {
                alert(`Erro: ${data.erro}`);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de rede. Tente novamente.');
        }
    });

    // Lógica de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.mensagem);
                // Redireciona o usuário para a página principal da loja
                window.location.href = 'index.html'; 
            } else {
                alert(`Erro: ${data.erro}`);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de rede. Tente novamente.');
        }
    });
});
