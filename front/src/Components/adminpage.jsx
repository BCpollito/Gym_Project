import { useEffect, useState } from "react";
import axios from "axios";
import './css/admin.css'

export default function AdminPage() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function getClients() {
            try {
                // Realiza la solicitud a la API
                const response = await axios.get("http://localhost:3000/registros");
                
                const clientsData = response.data; // Aquí asignamos directamente la respuesta
                
                setClientes(clientsData); // Almacena los clientes en el estado
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            } 
        }

        getClients();
    }, []); // Solo se ejecuta una vez al montar el componente

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
                                    <a href="#" className="editbtn">Editar</a>
                                    <a href="#" className="editbtn">Ver</a>
                                    </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
