import { useParams } from "react-router-dom";
import { useState } from 'react';

export default function AddRoutine() {
    const { clientId } = useParams();

    const [Nombre, setSemana] = useState("");
   //const []

    const handleSubmit = async () => {
        
    }
    return (
        <div className="contenedorRutina">
            <h1>Asignar Rutina a Cliente {clientId}</h1>
            <form onSubmit={handleSubmit} className="formularioRutina">
                <label>Semana</label>
                <input
                id="semana"
                name="semana"
                type="text"
                onChange={(e) => setSemana(e.target.value)}
                />
                <label>Dia</label>
                <select name="dias" id="dias" onChange={(e) => setDia(e.target.value)}>
                    <option value="">--seleccione una opcion--</option>
                    <option value="1">Dia 1</option>
                    <option value="2">Dia 2</option>
                    <option value="3">Dia 3</option>
                    <option value="4">Dia 4</option>
                    <option value="5">Dia 5</option>
                    <option value="6">Dia 6</option>
                    <option value="7">Dia 7</option>
                </select>
                <label>Ejercicio</label>
                <input
                id="ejercicio"
                name="ejercicio"
                type="text"
                />
                <label>Descripción</label>
                <textarea
                name="descripcion" 
                id="descripcion"></textarea>
            </form>
        </div>
    );
}
