import { Card, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from 'lucide-react';

const TABLE_HEAD = ["Cliente", "Peso", "Estatura", "Edad", "Sexo", "Asignar Rutina"];

export default function AdminPage() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function getClients() {
            try {
                // Realiza la solicitud a la API
                const response = await axios.get("http://localhost:3000/registros");
                const clientsData = response.data; // Aquí asigno directamente la respuesta
                setClientes(clientsData); // Almacena los clientes en el estado
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        }

        getClients();
    }, []);

    const HandleDeleteRegistro = async (key) => {
        try {
            alert('registro eliminado');
            window.location.reload();
            await axios.delete(`http://localhost:3000/registros/${key}`)            
        } catch (error) {
            console.error('Error al eliminar registro:', error);
            alert('Hubo un error al eliminar registro');
        }
    }

    return (
        <Card className="h-full w-full overflow-y-auto">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">{head}</th>
                        )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((element, idx) => {
                        if (!element.isAdmin) {
                            const isLast = idx === clientes.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={element.id}>
                                <td className={classes} >{element.name}</td>
                                <td className={classes} >{element.weight}</td>
                                <td className={classes} >{element.height}</td>
                                <td className={classes} >{element.age}</td>
                                <td className={classes} >{element.sex}</td>
                                <td className={classes} >
                                    <div className="flex gap-2">
                                        <IconButton size="md" variant="filled" color="green">
                                        <Link to={`/addrutine/${element.id}`} className="pointer">
                                        <Pencil />
                                        </Link>
                                        </IconButton>
                                        
                                        <IconButton size="md" color="red" onClick={() => HandleDeleteRegistro(element.id)}>
                                        <Trash2 />
                                        </IconButton>
                                        
                                    </div>
                                </td>
                            </tr>
                        )
                        }
                        
                    }
                    )}
                </tbody>
            </table>
        </Card>
    );
}
