const { Workouts, Bloques, WorkoutExercises, Ejercicio, Descansos, WorkoutElementos } = require("../models");

//crear un workout
exports.createWorkout = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre.trim()) {
            return res.json({ success: false, message: "El nombre es obligatorio" });
        } else {
            const newWorkout = await Workouts.create({
                nombre,
                descripcion
            });
            return res.status(201).json({ newWorkout: newWorkout, message: "Workout creado exitosamente", success: true });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//obtener todos los workouts
exports.getAllWorkout = async (req, res) => {
    try {
        const workouts = Workouts.findAll();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener workouts: ${error}` });
    }
};

//obtener workout por id y sus relaciones(opcional)
exports.getWorkoutById = async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    const workout = await Workouts.findByPk(id, {
      include: include === "full" ? [
        {
          model: Bloques,
          include: [
            {
              model: WorkoutExercises,
              include: [
                {
                  model: Ejercicio
                }
              ]
            }
          ]
        },
        {
          model: Descansos
        },
        {
          model: WorkoutElementos,
          include: [
            { model: Bloques, as: 'bloque' },
            { model: Descansos, as: 'descanso' }
          ]
        }
      ] : []
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    res.json(workout);
  } catch (error) {
    console.error("Error al obtener workout:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

//actualizar workout
exports.updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        if (!nombre.trim()) {
            return res.json({ success: false, message: "El nombre es obligatorio" });
        } else {
            await Workouts.update(
                { nombre, descripcion },
                { where: { id: id } }
            );
            return res.status(201).json({ message: "Workout actualizado exitosamente", success: true });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        await Workouts.destroy({ where: { id: id } });
        return res.json({message: "workout eliminado satisfactoriamente"})
    } catch (error) {
        return res.json({error: `Algo salio mal: ${error}`});
    }
};