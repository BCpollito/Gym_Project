const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());

app.use(cors({
    origin: '*',  // Permitir solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type'],  // Encabezados permitidos
}));

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    }
);

const registro = sequelize.define('registro', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Por defecto, no es administrador
    }
}, {
    timestamps: false, //desactivar la creacion de las columnas "CreateAt" y "UpdateAt"
});

// Sincronizar el modelo con la base de datos
sequelize.sync().then(() => {
    console.log('Tablas creadas');
}).catch(err => {
    console.error('Error al crear tablas', err);
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL database');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Ruta principal del proyecto
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Ruta para obtener todos los Registros
app.get('/registros', async (req, res) => {
    const registros = await registro.findAll();
    res.json(registros);
});

// Ruta para crear un nuevo registro
app.post('/registros', async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear un nuevo registro en la base de datos con el hash de la contraseña
        const nuevoRegistro = await registro.create({
            usuario,
            password: hashedPassword
        });
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Ruta para eliminar un registro
app.delete('/registros/:id', async (req, res) => {
    try {
        const eliminarRegistro = await registro.findByPk(req.params.id);
        if (eliminarRegistro) {
            await eliminarRegistro.destroy();
            res.status(204).send();
        } else {
            res.status(400).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//Ruta para editar un registro
app.put('/registros/:id', async (req, res) => {
    try {
        const editarRegistro = await registro.findByPk(req.params.id);
        if (editarRegistro) {
            await editarRegistro.update(req.body);
            res.json(editarRegistro);
        } else {
            res.status(400).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        // Buscar el registro de usuario en la base de datos
        const usuarioEncontrado = await registro.findOne({ where: { usuario } });
        if (usuarioEncontrado) {
            // Comparar la contraseña proporcionada con el hash almacenado
            const match = await bcrypt.compare(password, usuarioEncontrado.password);

            if (match) {
                if (usuarioEncontrado.isAdmin) {
                    return res.json({ success: true, message: 'Inicio de sesión exitoso', role: 'admin' });
                } else {
                    return res.json({ success: true, message: 'Inicio de sesión exitoso', role: 'user' });
                }
            } else {
                return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



// Conexión con el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puertos ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});