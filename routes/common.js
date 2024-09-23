const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Server: Common routes loaded!');
});

router.get('/video/search/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM videos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erro no servidor');
        if (results.length === 0) return res.status(404).send({ message: 'Video não encontrado' });

        res.status(200).send(results[0]);
    });
});

router.get('/video/all', (req, res) => {

    db.query('SELECT * FROM videos', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'Não há videos' });
        }

        res.status(200).send(results); // Return all videos, not just the first one
    });
});

router.post('/video/comment', (req, res) => {
    // ID | userId | dateTime | videoId | comment | likes
    const { userId, userName, dateTime, videoId, comment, likes } = req.body;

    db.query('INSERT INTO comments (userid, datetime, videoid, comment, likes, username) VALUES (?, ?, ?, ?, ?, ?)', [userId, dateTime, videoId, comment, likes, userName], (err, result) => {
        if (err) return res.status(500).send('Erro no servidor');
        res.status(201).send({ message: 'Comentário adicionado' });
    });
});

router.get('/video/comments/:videoid', (req, res) => {
    const { videoid } = req.params;

    db.query('SELECT * FROM comments WHERE videoid = ?', [videoid], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'Comentários não encontrados' });
        }

        res.status(200).send(results);
    });
});


//! Pegar dados do usuário
router.get('/user/:userid', (req, res) => {
    const { userid } = req.params;

    console.log(`COMMON: Searching user id ${userid} on users`);

    db.query('SELECT * FROM users WHERE id = ?', [userid], (err, results) => {

        if (results.length === 0) {
            console.log('Nenhum usuário encontrado', userid);
            return res.status(404).send({ message: 'Sem jornadas' });
        } else if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        } else {
            res.status(200).send(results[0]);
        }
    });
});

module.exports = router;