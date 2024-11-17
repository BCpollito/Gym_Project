import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import './css/addroutine.css'

export default function AddRoutine() {
    const { clientId } = useParams();
    const [cliente, setcliente] = useState({});

    useEffect(() => {
        async function getclient() {
            try {
                const response = await axios.get(`http://localhost:3000/registros/${clientId}`);
                const clientData = response.data;
                setcliente(clientData);

            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        getclient();
    }, [clientId])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weekName, setWeekName] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Función para manejar el clic fuera del modal
    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false); // Cerrar el modal si el clic es en el fondo
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Semana añadida:", weekName);

        try {
            const response = await axios.post('http://localhost:3000/semana', {
                Nombre: weekName,
                ClienteID: clientId
            })

            // Si la solicitud fue exitosa
            console.log('Semana añadida:', response.data);
            alert('Semana añadida con éxito');

            setWeekName('');
        } catch (error) {
            console.error('Error al registrarse', error);
            alert('Hubo un error al añadir semana');
        }

        setIsModalOpen(false); // Cerrar el modal después de enviar
    };

    return (
        <div className="contenedorRutina">
            <h1>Asignar Rutina a Cliente {cliente.name}</h1>
            <h1>Peso: {cliente.weight}</h1>
            <h1>Altura: {cliente.height}</h1>
            <h1>Edad: {cliente.age}</h1>
            <h1>Genero: {cliente.sex}</h1>

            <button className="añadirnuevasemana" onClick={handleOpenModal}>Añadir nueva semana</button>

            {isModalOpen && (
                <div className="modal" onClick={handleOutsideClick}> {/* Detecta el clic fuera del modal */}
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Introduce el nombre de la nueva semana</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nombre de la semana"
                                value={weekName}
                                onChange={(e) => setWeekName(e.target.value)}
                                required
                            />
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
