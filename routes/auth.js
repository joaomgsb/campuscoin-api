const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Server: Auth routes loaded!');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Erro no servidor');
        if (results.length === 0) return res.status(401).send({ message: 'Usuário não encontrado' });

        const userData = results[0];
        const passwordIsValid = bcrypt.compareSync(password, userData.password);

        if (!passwordIsValid) return res.status(401).send({ message: 'Senha incorreta' });

        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            level: userData.level,
        };

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '2h' }); // Token expira em 2 horas
        res.status(200).send({ auth: true, token, user });
    });
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query('SELECT id FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).send('Erro no servidor');

        if (result.length > 0) {
            return res.status(200).send('Este email já existe.');
        } else {
            db.query('INSERT INTO users (name, email, password, level) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, 1], (err, result) => {
                if (err) return res.status(500).send('Erro no servidor');
                res.status(201).send({ message: 'Usuário registrado com sucesso!' });
            });
        }
    });
});

router.post('/change-password', (req, res) => {
    const { userId, password, newPassword } = req.body;

    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).send('Erro no servidor');
        if (results.length === 0) return res.status(401).send({ message: 'Usuário não encontrado' });

        const userData = results[0];
        const passwordIsValid = bcrypt.compareSync(password, userData.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Senha incorreta' });
        } else {
            const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

            db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId], (err, result) => {
                if (err) return res.status(500).send('Erro no servidor');
                res.status(201).send({ message: 'Senha atualizada com sucesso!' });
            });
        }
    });
});

router.get('/verify-token', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'Token inválido ou nulo' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Falha ao tentar autenticar Token' });

        res.status(200).send({ auth: true, message: 'Token Válido.' });
    });
});

router.get('/verify-token', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'Token inválido ou nulo' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Falha ao tentar autenticar Token' });

        res.status(200).send({ auth: true, message: 'Token Válido.' });
    });
});

module.exports = router;