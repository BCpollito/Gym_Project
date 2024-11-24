import {
    Button,
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const [usuario, setUsuario] = useState('');
    const [password, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { usuario, password });
            if (response.data.success) {
                if (response.data.role === 'admin') {
                    navigate('/adminpage'); // Redirige a la página de administrador
                } else {
                    navigate('/userpage'); // Redirige a la página de usuario
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
        <Card color="transparent" shadow={false}>
            <Typography variant="h4">
                Iniciar sesión
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col gap-2">
                <Input
                    size="lg"
                    label="Usuario"
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <Input
                    type="password"
                    size="lg"
                    label="Contraseña"
                    onChange={(e) => setContraseña(e.target.value)}
                />
                <Button className="mt-6" fullWidth onClick={handleLogin}>
                    Iniciar
                </Button>
            </form>
            <Typography color="gray" className="mt-4 text-center font-normal">
                Ya tienes una cuenta?{" "}
                <Link to="/register" className="font-medium text-gray-900 underline">
                    Registrarse
                </Link>
            </Typography>
        </Card>
    )
}
