import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function getClients() {
            try {
                // Realiza la solicitud a la API
                const response = await axios.get("http://localhost:3000/registros");
                
                // No hay 'results', solo necesitas acceder directamente a los datos
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
                            <th>CLIENTES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(element => (
                            <tr key={element.id}> 
                                <td>{element.usuario}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
