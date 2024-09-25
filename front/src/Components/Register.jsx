import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import './css/app.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUsuario] = useState("");
    const [password, setContraseña] = useState("");
    const navigate = useNavigate();

const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:3000/registros', {
            usuario : user,
            password: password,
        });
        if (response.data.success) {
            alert('Los campos no pueden estar vacios');
        } else {
            alert(`Registrado exitosamente Usuario ${user}`);
            navigate('../Login.jsx');
        }
    } catch (error) {
        console.error('Error al registrarse', error);
        alert('Hubo un error al intentar registrarse');
    }
};

    return (
        <div className="contenedor">
            <div className="register">
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
                    <button className="registerbtn" onClick={handleSubmit}>Crear cuenta</button>
                    <Link to="../Login.jsx">Regresar</Link>
            </div>
        </div>
    )
}