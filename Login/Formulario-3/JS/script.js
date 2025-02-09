// Función para registrar un nuevo usuario
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const registerMessage = document.getElementById('register-message');
    if (response.ok) {
        registerMessage.textContent = 'Usuario registrado correctamente';
    } else {
        registerMessage.textContent = `Error: ${data.error || data.message}`;
    }
});

// Función para iniciar sesión
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const loginMessage = document.getElementById('login-message');
    if (response.ok) {
        loginMessage.textContent = `Login exitoso! Token: ${data.token}`;
    } else {
        loginMessage.textContent = `Error: ${data.error || data.message}`;
    }
});








