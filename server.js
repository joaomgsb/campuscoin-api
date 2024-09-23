const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // Correct origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

const authRoutes = require('./routes/auth');
const commonRoutes = require('./routes/common');
const journeyRoutes = require('./routes/journey');

app.use('/api/auth', authRoutes);
app.use('/api/common', commonRoutes);
app.use('/api/journey', journeyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server: Running on port ${PORT}`));
