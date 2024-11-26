const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: "*", // Permitir solicitudes desde cualquier origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Encabezados permitidos
  })
);

let sequelize;
/* const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            port: process.env.DB_PORT
        }
    ); */
try {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
    }
  );
} catch (error) {
  sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL);
}

//modelo de la tabla registro de cliente
const registro = sequelize.define(
  "registro",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto, no es administrador
    },
  },
  {
    timestamps: false, //desactivar la creacion de las columnas "CreateAt" y "UpdateAt"
  }
);

//modelo de la tabla semana para gestionar las semanas de las rutinas
const Semana = sequelize.define(
  "Semana",
  {
    ID_semana: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClienteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: registro,
        key: "id",
      },
    },
  },
  {
    tableName: "Semanas",
  }
);

//modelo de la tabla para los dias a los que se asignaran las rutinas
const Dia = sequelize.define(
  "Dia",
  {
    ID_dia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_semana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Semana,
        key: "ID_semana",
      },
    },
    Dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Dias",
  }
);

//modelo de la tabla ejercicios
const Ejercicio = sequelize.define(
  "Ejercicio",
  {
    ID_ejercicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_dia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Dia,
        key: "ID_dia",
      },
    },
  },
  {
    tableName: "Ejercicios",
  }
);

//relaciones entre las tablas
registro.hasMany(Semana, { foreignKey: "ClienteID", onDelete: "CASCADE" });

Semana.hasMany(Dia, { foreignKey: "ID_semana", onDelete: "CASCADE" });
Semana.belongsTo(registro, { foreignKey: "ClienteID" });

Dia.hasMany(Ejercicio, { foreignKey: "ID_dia", onDelete: "CASCADE" });
Dia.belongsTo(Semana, { foreignKey: "ID_semana" });

// Crear una nueva semana
app.post("/semana", async (req, res) => {
  try {
    const { Nombre, ClienteID } = req.body;

    const nuevaSemana = await Semana.create({ Nombre, ClienteID });
    res.status(201).json(nuevaSemana);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la semana" });
  }
});

// Obtener todas las semanas
app.get("/semana", async (req, res) => {
  try {
    const semanas = await Semana.findAll();
    res.json(semanas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las semanas" });
  }
});

// Obtener las semanas de un cliente específico
app.get("/clientes/:id/semanas", async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar las semanas correspondientes al cliente por su ID
    const semanas = await Semana.findAll({
      where: { ClienteID: id },
      include: [
        {
          model: Dia,
          include: [Ejercicio],
        },
      ],
    });

    if (semanas.length > 0) {
      res.json(semanas);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron semanas para este cliente" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las semanas del cliente" });
  }
});

// Actualizar una semana
app.put("/semana/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre } = req.body;
    await Semana.update({ Nombre }, { where: { ID_semana: id } });
    res.json({ message: "Semana actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la semana" });
  }
});

// Eliminar una semana
app.delete("/semana/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Semana.destroy({ where: { ID_semana: id } });
    res.json({ message: "Semana eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la semana" });
  }
});

// Crear un nuevo día
app.post("/dia", async (req, res) => {
  try {
    const { ID_semana, name } = req.body;
    const nuevoDia = await Dia.create({ ID_semana, Dia: name });
    res.status(201).json(nuevoDia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el día" });
  }
});

// Obtener todos los días de una semana
app.get("/dia/:id_semana", async (req, res) => {
  try {
    const { id_semana } = req.params;
    const dias = await Dia.findAll({ where: { ID_semana: id_semana } });
    res.json(dias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los días" });
  }
});

// Actualizar un día
app.put("/dia/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Dia } = req.body;
    await Dia.update({ Dia }, { where: { ID_dia: id } });
    res.json({ message: "Día actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el día" });
  }
});

// Eliminar un día
app.delete("/dia/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Dia.destroy({ where: { ID_dia: id } });
    res.json({ message: "Día eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el día" });
  }
});

// Crear un nuevo ejercicio
app.post("/ejercicio", async (req, res) => {
  try {
    const { Nombre, Descripcion, ID_dia } = req.body;
    const nuevoEjercicio = await Ejercicio.create({
      Nombre,
      Descripcion,
      ID_dia,
    });
    res.status(201).json(nuevoEjercicio);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el ejercicio" });
  }
});

// Obtener todos los ejercicios de un día
app.get("/ejercicio/:id_dia", async (req, res) => {
  try {
    const { id_dia } = req.params;
    const ejercicios = await Ejercicio.findAll({ where: { ID_dia: id_dia } });
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los ejercicios" });
  }
});

// Actualizar un ejercicio
app.put("/ejercicio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    await Ejercicio.update(
      { Nombre, Descripcion },
      { where: { ID_ejercicio: id } }
    );
    res.json({ message: "Ejercicio actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el ejercicio" });
  }
});

// Eliminar un ejercicio
app.delete("/ejercicio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Ejercicio.destroy({ where: { ID_ejercicio: id } });
    res.json({ message: "Ejercicio eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el ejercicio" });
  }
});

// Sincronizar el modelo con la base de datos
sequelize
  .sync()
  .then(() => {
    console.log("Tablas creadas");
  })
  .catch((err) => {
    console.error("Error al crear tablas", err);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Ruta principal del proyecto
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

// Ruta para obtener todos los Registros
app.get("/registros", async (req, res) => {
  const registros = await registro.findAll();
  res.json(registros);
});

// Obtener un registro por ID
app.get("/registros/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const registroEncontrado = await registro.findByPk(id);

    if (registroEncontrado) {
      res.json(registroEncontrado);
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el registro" });
  }
});

// Ruta para crear un nuevo registro

const bcrypt = require("bcryptjs");
const saltRounds = 10;

app.post("/registros", async (req, res) => {
  try {
    const { usuario, password, name, weight, height, age, sex } = req.body;

    if (
      !usuario.trim() ||
      !password.trim() ||
      !name.trim() ||
      !weight.trim() ||
      !height.trim() ||
      !age.trim() ||
      !sex.trim()
    ) {
      return res.json({ success: true });
    } else {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Crear un nuevo registro en la base de datos con el hash de la contraseña
      const nuevoRegistro = await registro.create({
        usuario,
        password: hashedPassword,
        name,
        weight,
        height,
        age,
        sex,
      });
      res.status(201).json(nuevoRegistro);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Ruta para eliminar un registro
app.delete("/registros/:id", async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    // Eliminar semanas asociadas al cliente
    await Semana.destroy({
      where: { ClienteID: id },
      transaction,
    });

    // Eliminar el cliente
    await registro.destroy({
      where: { id: id },
      transaction,
    });

    // Confirmar la transacción
    await transaction.commit();
    console.log("Cliente y semanas asociadas eliminados exitosamente.");

    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error("Error al eliminar cliente y semanas:", error);
    res.status(500).json({ message: "Error al eliminar registro" });
  }
});

//Ruta para editar un registro
app.put("/registros/:id", async (req, res) => {
  try {
    const editarRegistro = await registro.findByPk(req.params.id);
    if (editarRegistro) {
      await editarRegistro.update(req.body);
      res.json(editarRegistro);
    } else {
      res.status(400).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const usuarioEncontrado = await registro.findOne({ where: { usuario } });
    if (!usuarioEncontrado)
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });

    const match = await bcrypt.compare(password, usuarioEncontrado.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });

    const role = usuarioEncontrado.isAdmin ? "admin" : "user";
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      role,
      data: usuarioEncontrado,
    });
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
