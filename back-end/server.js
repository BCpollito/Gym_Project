const express = require("express");
const CorsConfig = require("./config/corsConfig");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();

require("./models");

app.use(CorsConfig);
app.use(express.json());

app.use(require("./routes/registroRoutes"));
app.use(require("./routes/ejercicioRoutes"));
app.use(require("./routes/loginRoutes"));
app.use(require("./routes/workoutsRoutes"));
app.use(require("./routes/bloquesRoutes"));
app.use(require("./routes/workoutElementRoutes"));
app.use(require("./routes/descansosRoutes"));
app.use(require("./routes/workoutExerciseRoutes"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Gym_Project funcionando");
});

// Sincronizar modelos y levantar servidor
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`servidor corriendo en el puertos ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:\n");
    console.log(error);
  });
