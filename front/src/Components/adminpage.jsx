import axios from "axios";

export default function Adminpage(){

    async function getclient() {
        try {
            const response  = await fetch(axios.get("http://localhost:3000/registros"));
            const clientes = await response.json();

            const promises = clientes.results.map(cliente => fetch(cliente.url).then(response => response.json()));
            const clientsData = await Promise.all(promises);

            return(
                <div className="contenedor">
                    <div className="clientes">
                        <table>
                            <thead>
                                <tr>
                                    <th>CLIENTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientsData.forEach(element => {
                                    <tr>
                                        <td>Usuario</td>
                                        <td>{element.usuario}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )

        } catch (error) {
            console.error(error);
        }   
    }

getclient();

}