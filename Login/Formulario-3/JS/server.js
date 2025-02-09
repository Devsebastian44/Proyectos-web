// Importar módulos
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');  // Habilitar CORS
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());  // Usar CORS

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia esto si es necesario
    password: 'Python444@',  // Cambia esto por tu contraseña de MySQL
    database: 'login_db'  // Asegúrate de tener la base de datos correcta
});

// Conexión a MySQL
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Registro de usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        res.json({ message: 'Usuario registrado correctamente' });
    });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, username: user.username }, 'secreto', { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token });
    });
});

// Middleware para verificar token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token requerido' });

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });
        req.user = decoded;
        next();
    });
};

// Ruta protegida
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});


