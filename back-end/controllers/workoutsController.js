const { Workouts, Bloques, WorkoutExercises, Ejercicio, Descansos, WorkoutElementos } = require("../models");

// Crear un workout
exports.createWorkout = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre.trim()) {
      return res.json({ success: false, message: "El nombre es obligatorio" });
    }

    const newWorkout = await Workouts.create({ nombre, descripcion });
    return res.status(201).json({
      newWorkout,
      message: "Workout creado exitosamente",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los workouts
exports.getAllWorkout = async (req, res) => {
  try {
    const workouts = await Workouts.findAll();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener workouts: ${error}` });
  }
};

// Obtener workout por ID (simple o completo según el query param)
exports.getWorkoutById = async (req, res) => {
  const { id } = req.params;
  const { include } = req.query; //  query param ?include=full

  try {
    const workout = await Workouts.findByPk(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    //  devolver solo los datos básicos
    if (include !== 'full') {
      return res.json({
        workout: {
          id: workout.id,
          nombre: workout.nombre,
          descripcion: workout.descripcion
        }
      });
    }

    //  obtener todos los elementos ordenados
    const elementos = await WorkoutElementos.findAll({
      where: { workoutID: id },
      order: [['orden', 'ASC']],
    });

    const elementosDetallados = [];

    for (const elem of elementos) {
      if (elem.tipo === 'Bloque') {
        const bloque = await Bloques.findByPk(elem.elementoID, {
          include: [
            {
              model: WorkoutExercises,
              include: [{ model: Ejercicio }],
            },
          ],
        });

        if (bloque) {
          elementosDetallados.push({ tipo: 'Bloque', data: bloque });
        }
      } else if (elem.tipo === 'Descanso') {
        const descanso = await Descansos.findByPk(elem.elementoID);
        if (descanso) {
          elementosDetallados.push({ tipo: 'Descanso', data: descanso });
        }
      }
    }

    res.json({
      workout: {
        id: workout.id,
        nombre: workout.nombre,
        descripcion: workout.descripcion
      },
      elementos: elementosDetallados
    });
  } catch (error) {
    console.error("Error al obtener workout:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};


// Actualizar workout
exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre.trim()) {
      return res.json({ success: false, message: "El nombre es obligatorio" });
    }

    await Workouts.update({ nombre, descripcion }, { where: { id } });
    return res
      .status(201)
      .json({ message: "Workout actualizado exitosamente", success: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Eliminar workout
exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    await Workouts.destroy({ where: { id } });
    return res.json({ message: "Workout eliminado satisfactoriamente" });
  } catch (error) {
    return res.json({ error: `Algo salió mal: ${error}` });
  }
};