import { Link } from "react-router-dom"

export default function login() {
    return (
        <div className="contenedor">
            <div className="login">
                <h1>Iniciar sesión</h1>
                <table className="inputs">
                    <tr><td><input type="text" className="usu" name="usuario" placeholder="Usuario" /></td></tr>
                    <tr><td><input type="password" className="contra" name="contraseña" placeholder="Contraseña" /></td></tr>
                </table>
                <input type="button" className="ingresar" name="login" value={"Ingresar"} />
                <Link to="./Register.jsx">Registrarse</Link>
            </div>
        </div>
    )
}

