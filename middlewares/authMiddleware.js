const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'Você não está autenticado!' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
        }

        // Save the decoded token to the request for use in other routes
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;