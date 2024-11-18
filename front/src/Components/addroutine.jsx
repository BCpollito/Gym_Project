import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import './css/addroutine.css'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button
} from "@material-tailwind/react";

export default function AddRoutine() {
    const { clientId } = useParams();
    const [cliente, setCliente] = useState({});
    const [semanas, setSemanas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDay, setIsModalOpenDia] = useState(false);

    const [open, setOpen] = useState();
    const [openDia, setOpenDia] = useState();

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const handleOpenDia = (value) => setOpenDia(openDia === value ? 0 : value);

    useEffect(() => {
        async function getClient() {
            try {
                const response = await axios.get(`http://localhost:3000/registros/${clientId}`);
                setCliente(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del cliente:', error);
            }
        }
        getClient();
    }, [clientId]);

    useEffect(() => {
        async function getSemanas() {
            try {
                const response = await axios.get(`http://localhost:3000/clientes/${clientId}/semanas`);
                setSemanas(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener las semanas:', error);
            }
        }
        getSemanas();
    }, [clientId]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleOpenModalDia = () => {
        setIsModalOpenDia(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsModalOpenDia(false);
    };

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
            setIsModalOpenDia(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const input = event.target.elements.namedItem("weekName")

        try {
            await axios.post('http://localhost:3000/semana', {
                Nombre: input.value,
                ClienteID: clientId
            });
            alert('Semana añadida con éxito');
            input.value = '';
            window.location.reload(); // Recargar la página para actualizar datos
        } catch (error) {
            console.error('Error al añadir semana:', error);
            alert('Hubo un error al añadir semana');
        }
        setIsModalOpen(false);
    };

    const handleSubmitDia = async (event, foreinKeyWeek) => {
        event.preventDefault();
        const input = event.target.elements.namedItem("DayName")
        console.log("input: ", input.value)
        console.log("foreinKeyWeek: ", foreinKeyWeek)
        try {
            await axios.post('http://localhost:3000/dia', {
                Dia: input.value,
                ID_semana: foreinKeyWeek
            })
            alert('Dia añadida con éxito');
            input.value = '';
            window.location.reload(); // Recargar la página para actualizar datos
        } catch (error) {
            console.error('Error al añadir Dia:', error);
            alert('Hubo un error al añadir Dia');
        }
        setIsModalOpenDia(false)
    }

    return (
        <div className="contenedorRutina">
            <h1>Asignar Rutina a Cliente {cliente.name}</h1>
            <h2>Peso: {cliente.weight}</h2>
            <h2>Altura: {cliente.height}</h2>
            <h2>Edad: {cliente.age}</h2>
            <h2>Género: {cliente.sex}</h2>

            <button className="añadirnuevasemana" onClick={handleOpenModal}>Añadir nueva semana</button>

            {/*Modal añadir semana*/}
            {isModalOpen && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Introduce el nombre de la nueva semana</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nombre de la semana"
                                name="weekName"
                                required
                            />
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                </div>
            )}

            {/*Modal añadir dia*/}
            {isModalOpenDay && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Introduce el nombre del Dia</h2>
                        <form onSubmit={(event) => handleSubmitDia(event, open)}>
                            <input
                                type="text"
                                placeholder="Nombre del Dia"
                                name="DayName"
                                required
                            />
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                </div>
            )}

            {semanas.map((semana) => (
                <Accordion key={semana.ID_semana} open={open === semana.ID_semana}>
                    <AccordionHeader className="hover:text-inherit pointer-events">
                        <p className="w-full" onClick={() => handleOpen(semana.ID_semana)}>{semana.Nombre}</p>
                        
                    </AccordionHeader>

                    <AccordionBody>
                        <div className="w-full flex justify-end"> <Button onClick={handleOpenModalDia}
                            className="whitespace-nowrap">agregar dia</Button></div>
                        {semana.DiaSchemas.map((dia) => (
                            <Accordion key={dia.ID_dia} open={openDia === dia.ID_dia}>
                                <AccordionHeader onClick={() => handleOpenDia(dia.ID_dia)}>{dia.Dia}</AccordionHeader>
                                <AccordionBody>
                                    <h1>Ejercico 1</h1>
                                </AccordionBody>
                            </Accordion>
                        ))}
                    </AccordionBody>
                </Accordion>
            ))}


        </div>
    );
}
