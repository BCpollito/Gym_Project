import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import './css/app.css'

export default function Register() {
    const [user, setUsuario] = useState("");
    const [password, setContraseña] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        axios.post("http://localhost:3000/registros", {
            usuario: user,
            password: password,
        })
            .then(response => {
                console.log("registro agregado con exito", response.data);
            })
            .catch(error => {
                console.error("Error al agregar el registro:", error);
            })
    }

    return (
        <div className="contenedor">
            <div className="register">
                <form onSubmit={handleSubmit}>
                    <h1>Registrarse</h1>
                    <table className='formulario'>
                        <tbody>
                            <tr>
                                <td><label>USUARIO</label></td>
                                <td>
                                    <input
                                        className='usu'
                                        id="usuario"
                                        name="usuario"
                                        type="text"
                                        placeholder="Usuario"
                                        onChange={(e) => setUsuario(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td><label>CONTRASEÑA</label></td>
                                <td>
                                    <input
                                        className='contra'
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        onChange={(e) => setContraseña(e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="registerbtn" type="submit">Crear cuenta</button>
                    <Link to="./Login.jsx">Regresar</Link>
                </form>
            </div>
        </div>
    )
}