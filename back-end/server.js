const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión con el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puertos ${PORT}`);
});