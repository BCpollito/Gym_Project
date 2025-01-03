import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Trash2 } from 'lucide-react';

import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Nombre", "Descripción", "Acciones"];
export default function AddRoutine() {
    const { clientId } = useParams();
    const [cliente, setCliente] = useState({});
    const [semanas, setSemanas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDay, setIsModalOpenDia] = useState(false);
    const [isModalOpenEjercicio, setIsModalOpenEjercicio] = useState(false);
    const [isModalOpenDescripcion, setisModalOpenDescripcion] = useState(false);
    const [description, setdescripcion] = useState("");
    function handleModalWeek() {
        setIsModalOpen(e => !e)
    }
    function handleModalDay() {
        setIsModalOpenDia(e => !e)
    }
    function handleModalEjercicio() {
        setIsModalOpenEjercicio(e => !e)
    }
    function HandleViewDescription(descripcion) {
        setisModalOpenDescripcion(e => !e)
        setdescripcion(descripcion);
    }

    const [open, setOpen] = useState();
    const [openDia, setOpenDia] = useState();

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const handleOpenDia = (value) => setOpenDia(openDia === value ? 0 : value);

    useEffect(() => {
        async function getClient() {
            try {
                const response = await axios.get(`/registros/${clientId}`);
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
                const response = await axios.get(`/clientes/${clientId}/semanas`);
                setSemanas(response.data);
            } catch (error) {
                console.error('Error al obtener las semanas:', error);
            }
        }
        getSemanas();
    }, [clientId]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const input = event.target.elements.namedItem("weekName")

        try {
            await axios.post('/semana', {
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
    };

    const handleSubmitDia = async (event, foreinKeyWeek) => {
        event.preventDefault();
        const input = event.target.elements.namedItem("DayName")
        try {
            await axios.post('/dia', {
                name: input.value,
                ID_semana: foreinKeyWeek
            })
            alert('Dia añadida con éxito');
            input.value = '';
            window.location.reload(); // Recargar la página para actualizar datos
        } catch (error) {
            console.error('Error al añadir Dia:', error);
            alert('Hubo un error al añadir Dia');
        }
    }

    const handleSubmitEjercicio = async (event, foreinKeyDay) => {
        event.preventDefault();
        const tituloEjercicio = event.target.elements.namedItem("nombreEjercicio")
        const DescripcionEjercicio = event.target.elements.namedItem("DescripcionEjercicio")
        try {
            await axios.post('/ejercicio', {
                Nombre: tituloEjercicio.value,
                Descripcion: DescripcionEjercicio.value,
                ID_dia: foreinKeyDay
            })
            alert('ejercicio añadido con éxito');
            tituloEjercicio.value = '';
            DescripcionEjercicio.value = '';
            window.location.reload(); // Recargar la página para actualizar datos
        } catch (error) {
            console.error('Error al añadir ejercicio:', error);
            alert('Hubo un error al añadir ejercicio');
        }
    }

    const HandleDelete = async (key) => {
        try {
            await axios.delete(`/ejercicio/${key}`)
            alert('ejercicio eliminado');
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar ejercicio:', error);
            alert('Hubo un error al eliminar ejercicio');
        }
    }

    const HandleDeleteDia = async (key) => {
        try {
            await axios.delete(`/dia/${key}`)
            alert('Dia eliminado');
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar dia:', error);
            alert('Hubo un error al eliminar dia');
        }
    }

    const HandleDeleteSemana = async (key) => {
        try {
            await axios.delete(`/semana/${key}`)
            alert('Semana eliminada');
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar semana:', error);
            alert('Hubo un error al eliminar semana');
        }
    }

    return (
        <>
            <div className="flex flex-col gap-8 min-h-screen relative">
                <div>
                    <Typography variant="h2" className="text-center">
                        Asignar Rutina a Cliente
                    </Typography>
                    <div className="flex flex-col gap-2">
                        <Typography variant="paragraph" className="font-bold text-2xl">{cliente.name}</Typography>
                        <p><strong>Peso:</strong> {cliente.weight}</p>
                        <p><strong>Altura:</strong> {cliente.height}</p>
                        <p><strong>Edad:</strong> {cliente.age}</p>
                        <p><strong>Género:</strong> {cliente.sex}</p>
                    </div>
                </div>
                {semanas.map((semana) => (
                    <Accordion key={semana.ID_semana} open={open === semana.ID_semana}>
                        <AccordionHeader className="uppercase flex justify-start whitespace-nowrap group"
                            onClick={() => handleOpen(semana.ID_semana)}>
                            {semana.Nombre}
                            <div className="w-full text-right group-hover:block hidden">
                                <IconButton color="red" variant="text" onClick={() => HandleDeleteSemana(semana.ID_semana)}>
                                    <Trash2 />
                                </IconButton>
                            </div>
                        </AccordionHeader>

                        <AccordionBody>
                            <div className="w-full flex justify-end">
                                <Button onClick={handleModalDay}
                                    className="whitespace-nowrap p-2">agregar dia</Button>
                            </div>
                            {semana.Dia.map((dia) => (
                                <Accordion key={dia.ID_dia} open={openDia === dia.ID_dia}>
                                    <AccordionHeader className="flex justify-start whitespace-nowrap group" onClick={() => handleOpenDia(dia.ID_dia)}>
                                        {dia.Dia}
                                        <div className="w-full text-right group-hover:block hidden">
                                            <IconButton color="red" variant="text" onClick={() => HandleDeleteDia(dia.ID_dia)}>
                                                <Trash2 />
                                            </IconButton>
                                        </div>

                                    </AccordionHeader>
                                    <AccordionBody>

                                        <table className="w-full text-left table-auto min-w-max">
                                            <thead>
                                                <tr className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                                    {
                                                        TABLE_HEAD.map((head) => (
                                                            <th key={head} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">{head}</p>
                                                            </th>
                                                        )
                                                        )
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dia.Ejercicios.map((ejercicio) => (
                                                    <tr key={ejercicio.ID_ejercicio}>
                                                        <td className="p-4 border-b border-blue-gray-50">{ejercicio.Nombre}</td>
                                                        <td onClick={() => HandleViewDescription(ejercicio.Descripcion)}
                                                            className="p-4 border-b border-blue-gray-50 whitespace-nowrap overflow-hidden max-w-48 text-ellipsis hover:font-bold hover:text-blue-800">
                                                            {ejercicio.Descripcion}
                                                        </td>
                                                        <td className="p-4 border-b border-blue-gray-50 ">
                                                            <Button className="bg-red-300" onClick={() => HandleDelete(ejercicio.ID_ejercicio)}>Eliminar</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                        <div className="flex justify-center w-full mt-2">
                                            <Button onClick={handleModalEjercicio}>Añadir Ejercicio</Button>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                            ))}
                        </AccordionBody>
                    </Accordion>
                ))}

                <Button onClick={handleModalWeek} className="!fixed bottom-4 left-1/2 transform -translate-x-1/2">Añadir nueva semana</Button>
            </div>


            {/*Modal añadir semana*/}
            <Dialog open={isModalOpen} handler={handleModalWeek}>
                <DialogHeader>Introduce el nombre de la nueva semana</DialogHeader>
                <DialogBody>
                    <form id="weekForm" onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            label="Nombre de la semana"
                            name="weekName"
                            required
                        />

                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleModalWeek}
                        className="mr-1"
                    >
                        <span>Cancelar</span>
                    </Button>
                    <Button type="submit" form="weekForm">Guardar</Button>
                </DialogFooter>
            </Dialog>


            {/*Modal añadir dia*/}
            <Dialog open={isModalOpenDay} handler={handleModalDay}>
                <DialogHeader>Introduce el nombre del Dia</DialogHeader>
                <DialogBody>
                    <form id="dayForm" onSubmit={(event) => handleSubmitDia(event, open)}>
                        <Input
                            type="text"
                            label="Nombre del Dia"
                            name="DayName"
                            required
                        />
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleModalDay}
                        className="mr-1"
                    >
                        <span>Cancelar</span>
                    </Button>
                    <Button form="dayForm" type="submit">Guardar</Button>
                </DialogFooter>
            </Dialog>


            {/*Modal añadir ejercicio*/}
            <Dialog open={isModalOpenEjercicio} handler={handleModalEjercicio}>
                <DialogHeader>Introduce el nombre del Dia</DialogHeader>
                <DialogBody>
                    <form id="ejercicioForm" className="flex flex-col gap-2" onSubmit={(event) => handleSubmitEjercicio(event, openDia)}>
                        <Input
                            type="text"
                            label="Nombre del Ejercicio"
                            name="nombreEjercicio"
                            required
                        />
                        <Textarea
                            label="DESCRIPCION"
                            name="DescripcionEjercicio"
                            required
                        />

                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleModalEjercicio}
                        className="mr-1"
                    >
                        <span>Cancelar</span>
                    </Button>
                    <Button type="submit" form="ejercicioForm">Guardar</Button>
                </DialogFooter>
            </Dialog>

            {/*Modal mostrar descripcion*/}
            <Dialog open={isModalOpenDescripcion} handler={HandleViewDescription}>
                <DialogHeader>DESCRIPCION</DialogHeader>
                <DialogBody>
                    <Typography className="whitespace-normal break-words" variant="lead">{description}</Typography>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={HandleViewDescription}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                    </DialogFooter>
                </DialogBody>
            </Dialog>
        </>
    );
}
