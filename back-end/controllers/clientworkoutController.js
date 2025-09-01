const { ClientWorkout } = require('../models');

// Asignar un workout a un cliente
exports.assignWorkoutToClient = async (req, res) => {
    try {
        const { clienteID, workoutID, dateAssign } = req.body;

        if (!clienteID || !workoutID || workoutID === null || !dateAssign) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios" });
        }

        const workouts = await ClientWorkout.findAll({
            where: { clienteID: clienteID }
        });

        for(const workout of workouts){
            if(workout.dateAssign === dateAssign){
                return res.json({ 
                    success: false, 
                    message: "Ya existe un workout asignado para esa fecha" 
                });
            }
        }

        const newClienteWorkout = await ClientWorkout.create({
            clienteID, workoutID, dateAssign
        });
        res.status(201).json({
            message: "Workout asignado al cliente exitosamente",
            success: true,
            clienteWorkout: newClienteWorkout
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

// Obtener todos los workouts asignados a un cliente
exports.getWorkoutsByClientId = async (req, res) => {

    const { clienteID } = req.params;

    try {
        const workouts = await ClientWorkout.findAll({
            where: { clienteID }
        });
        res.status(200).json({
            workouts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

// Eliminar un workout asignado a un cliente
exports.deleteClienteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        await ClientWorkout.destroy({ where: { id } });
        res.status(200).json({ message: "Workout asignado eliminado exitosamente", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message, success: false });

    }
}