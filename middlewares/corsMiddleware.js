const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173', // Your React app’s public IP and port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));