import {
    Button,
    Card, Checkbox, Input, List, Typography
} from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

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
                navigate('../login');
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
        <Card color="transparent" shadow={false}>
            <Typography variant="h4">
                Registro
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col gap-2">
                <Input
                    size="lg"
                    label="Usuario"
                    id="usuario"
                    name="usuario"
                    type="text"
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <Input
                    type="password"
                    size="lg"
                    label="Contraseña"
                    id="password"
                    name="password"
                    onChange={(e) => setContraseña(e.target.value)}
                />
                <Input
                    size="lg"
                    id="name"
                    name="name"
                    type="text"
                    label="Nombre y Apellido"
                    onChange={(e) => setNombreApellido(e.target.value)}

                />
                <Input
                    size="lg"
                    id="weight"
                    name="weight"
                    type="text"
                    label="Peso"
                    onChange={(e) => setPeso(e.target.value)}

                />
                <Input
                    size="lg"
                    id="height"
                    name="height"
                    type="text"
                    label="Estatura"
                    onChange={(e) => setEstatura(e.target.value)}

                />
                <Input
                    size="lg"
                    id="age"
                    name="age"
                    type="text"
                    label="Edad"
                    onChange={(e) => setEdad(e.target.value)}

                />
                <List className="flex-row justify-around">

                    <Checkbox
                        checked={sex === "Masculino"}
                        type="checkbox"
                        label="Masculino"
                        onChange={() => handleGeneroChange("Masculino")} />


                    <Checkbox
                        checked={sex === "Femenino"}
                        label="Femenino"
                        type="checkbox"
                        onChange={() => handleGeneroChange("Femenino")} />

                </List>

                <Button className="mt-6" fullWidth onClick={handleSubmit}>
                    Crear cuenta
                </Button>
            </form>
            <Typography color="gray" className="mt-4 text-center font-normal">
                <Link to="/login" className="font-medium text-gray-900 underline">
                    Iniciar Sesión
                </Link>
            </Typography>
        </Card>

    )
}