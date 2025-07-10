const cors = require('cors');

const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type"], 
};

module.exports = cors(corsOptions);