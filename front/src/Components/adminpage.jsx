import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

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

    return (
        <div className="contenedor">
            <div className="clientes">
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Peso</th>
                            <th>Estatura</th>
                            <th>Edad</th>
                            <th>Sexo</th>
                            <th>Asignar Rutina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(element => (
                            <tr key={element.id}> 
                                <td>{element.name}</td> 
                                <td>{element.weight}</td>
                                <td>{element.height}</td>
                                <td>{element.age}</td>
                                <td>{element.sex}</td>
                                <td><div className="contenedorbtn">
                                    <Link to={`/addrutine/${element.id}`} className="editbtn">Editar</Link>
                                    <Link to={`#`} className="editbtn">Eliminar</Link>
                                    </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
