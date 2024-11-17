import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import './css/register.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUsuario] = useState("");
    const [password, setContraseña] = useState("");
    const [name, setNombreApellido] = useState("");
    const [weight, setPeso] = useState("");
    const [height, setEstatura] = useState("");
    const [age, setEdad] = useState("");
    const [sex, setSexo] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/registros', {
                usuario: user,
                password: password,
                name: name,
                weight: weight,
                height: height,
                age: age,
                sex: sex
            });
            if (response.data.success) {
                alert('Los campos no pueden estar vacios');
            } else {
                alert(`Registrado exitosamente Usuario ${name}`);
                navigate('../Login.jsx');
            }
        } catch (error) {
            console.error('Error al registrarse', error);
            alert('Hubo un error al intentar registrarse');
        }
    };

    const handleGeneroChange = (genero) => {
        // Si selecciona un género, establece ese valor y des-selecciona el otro
        setSexo(genero);
    };

    return (
        <div className="contenedor">
            <div className="register">
                <h1>Registro</h1>
                <table className='formulario'>
                    <tbody>
                        <tr>
                            <td>
                                {/*USUARIO*/}
                                <input
                                    className='registerinput'
                                    id="usuario"
                                    name="usuario"
                                    type="text"
                                    placeholder="Usuario"
                                    onChange={(e) => setUsuario(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/*CONTRASEÑA*/}
                                <input
                                    className='registerinput'
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={(e) => setContraseña(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/*NOMBRE Y APELLIDO*/}
                                <input
                                    className='registerinput'
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nombre y Apellido"
                                    onChange={(e) => setNombreApellido(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/*PESO*/}
                                <input
                                    className='registerinput'
                                    id="weight"
                                    name="weight"
                                    type="text"
                                    placeholder="Peso"
                                    onChange={(e) => setPeso(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/*ESTATURA*/}
                                <input
                                    className='registerinput'
                                    id="height"
                                    name="height"
                                    type="text"
                                    placeholder="Estatura"
                                    onChange={(e) => setEstatura(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {/*EDAD*/}
                                <input
                                    className='registerinput'
                                    id="age"
                                    name="age"
                                    type="text"
                                    placeholder="Edad"
                                    onChange={(e) => setEdad(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="checkbox-group">
                                <label>Masculino</label>
                                <input
                                    className='registerinput'
                                    checked={sex === "Masculino"}
                                    type="checkbox"
                                    onChange={() => handleGeneroChange("Masculino")} />

                                <label>Femenino</label>
                                <input
                                    className='registerinput'
                                    checked={sex === "Femenino"}
                                    type="checkbox"
                                    onChange={() => handleGeneroChange("Femenino")} />
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