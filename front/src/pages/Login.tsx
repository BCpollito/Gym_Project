// Importamos componentes de UI y herramientas necesarias
import {
    Button,
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    //se tipean los estados
    const [usuario, setUsuario] = useState < string > ('');
    const [password, setContraseña] = useState < string > ('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            //se tipea la respuesta de axios
            const response = await axios.post < {
                success: boolean;
                role: string;
                data: { id: number };
            } > ('/login', { usuario, password }); // Aquí se envían los datos de usuario y contraseña al backend

            if (response.data.success) {
                if (response.data.role === 'admin') {
                    navigate('/clientes');
                } else {
                    navigate(`/userpage/${response.data.data.id}`);
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
        // @ts-expect-error
        <Card color="transparent" shadow={false}>
            {/* @ts-expect-error */}
            <Typography variant="h4">Iniciar sesión</Typography>

            <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col gap-2"
                onSubmit={(e) => {
                    e.preventDefault(); // Evita que la página se recargue
                    handleLogin();      // Llama a la función que maneja el inicio de sesión
                }}
            >
                {/* @ts-expect-error */}
                <Input
                    size="lg"
                    label="Usuario"
                    // se tipea el evento como un cambio en un input HTML
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsuario(e.target.value)
                    }
                />
                {/* @ts-expect-error */}
                <Input
                    type="password"
                    size="lg"
                    label="Contraseña"
                    // Igual que arriba, se el tipo correcto para eventos de input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setContraseña(e.target.value)
                    }
                />
                {/* @ts-expect-error */}
                <Button type="submit" className="mt-6" fullWidth>
                    Iniciar
                </Button>
            </form>

            {/* @ts-expect-error */}
            <Typography color="gray" className="mt-4 text-center font-normal">
                Ya tienes una cuenta?{" "}
                <Link to="/register" className="font-medium text-gray-900 underline">
                    Registrarse
                </Link>
            </Typography>
        </Card>
    );
}
