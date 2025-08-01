const { Descansos } = require("../models");

exports.createDescanso = async (req, res) => {
    try {
        const { workoutID, duracionSegundos} = req.body;
        const newRest = await Descansos.create({
            workoutID,
            duracionSegundos
        });
        return res.status(201).json({ newRest: newRest, message: "descanso creado exitosamente", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }

};

exports.updateDescanso = async (req, res) => {
    try{
        const { id } = req.params;
        const { duracionSegundos } = req.body;

        await Descansos.update(
            {duracionSegundos}, {where: {id: id}}
        );
        return res.status(201).json({ message: "descanso actualizado exitosamente", success: true });
    }catch (error){

    }
};