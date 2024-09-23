const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const verifyToken = require('../middlewares/authMiddleware');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Server: Journey routes loaded!');
});

router.get('/all', verifyToken, (req, res) => {

    db.query('SELECT * FROM journeys', (err, results) => {
        if (err) return res.status(500).send('Erro no servidor');
        if (results.length === 0) return res.status(404).send({ message: 'Sem jornadas' });

        res.status(200).send(results);
    });
});

router.get('/user/:userid', verifyToken, (req, res) => {
    const { userid } = req.params;

    console.log(`JOURNEY: Searching user id ${userid} in user_journeys`);

    db.query('SELECT * FROM user_journeys WHERE user_id = ?', [userid], (err, results) => {
        if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        }

        if (results.length === 0) {
            console.log('Nenhuma jornada encontrada para o usuário', userid);
            return res.status(404).send({ message: 'Sem jornadas' });
        }

        res.status(200).send(results);
    });
});

router.post('/user/add', verifyToken, (req, res) => {
    const { journeyId, completed, stages, actualStage, userId } = req.body;

    db.query('INSERT INTO user_journeys (journey_id, completed, stages, actual_stage, user_id) VALUES (?, ?, ?, ?, ?)', [journeyId, completed, stages, actualStage, userId], (err, results) => {
        if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        }

        res.status(200).send(results);
    });
});

//! Jornada por ID /api/journey/{ID}
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM user_journeys WHERE journey_id = ?', [id], (err, results) => {

        if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        } else {
            res.status(200).send(results[0]); // para mais de 1 resultado, retirar "[0]""
        }
    });
});

//! Todos stages por ID de jornada /api/journey/stages/{ID}
router.get('/stages/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM journeys_stages WHERE journey_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        } else {
            res.status(200).send(results);
        }
    });
});

//! Update user stages from certain journey
router.put('/stages/update/:id', (req, res) => {
    const { id } = req.body;

    db.query('UPDATE journeys_stages SET completed=true WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).send({ message: 'Erro no servidor' });
        } else {
            res.status(200).send(results);
        }
    });
});

module.exports = router;