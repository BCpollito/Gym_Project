import { Link } from "react-router-dom"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/app.css'

export default function Login() {

    const [usuario, setUsuario] = useState('');
    const [password, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { usuario, password });
            if (response.data.success) {
                if (response.data.role === 'admin') {
                    navigate('./adminpage.jsx'); // Redirige a la página de administrador
                } else {
                    navigate('./userpage.jsx'); // Redirige a la página de usuario
                }
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            alert('Hubo un error al intentar iniciar sesión');
        }
    };

    return (
        <div className="contenedor">
            <div className="login">
                <h1>Iniciar sesión</h1>
                <table className="inputs">
                    <tr><td><input type="text" className="usu" name="usuario" placeholder="Usuario" 
                    onChange={(e) => setUsuario(e.target.value)}/></td></tr>
                    <tr><td><input type="password" className="contra" name="contraseña" placeholder="Contraseña"
                    onChange={(e) => setContraseña(e.target.value)}  /></td></tr>
                </table>
                <input type="button" className="ingresar" name="login" value={"Ingresar"} 
                onClick={handleLogin}/>
                <Link to="./Register.jsx">Registrarse</Link>
            </div>
        </div>
    )
}

