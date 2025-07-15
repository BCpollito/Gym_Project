import {
  Button,
  Card,
  Checkbox,
  Input,
  List,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // Tipamos los estados como string (por defecto)
  const [user, setUsuario] = useState<string>("");
  const [password, setContraseña] = useState<string>("");
  const [name, setNombreApellido] = useState<string>("");
  const [weight, setPeso] = useState<string>("");
  const [height, setEstatura] = useState<string>("");
  const [age, setEdad] = useState<string>("");
  const [sex, setSexo] = useState<string>("");

  const navigate = useNavigate();

  // Manejador del botón "Crear cuenta"
  const handleSubmit = async () => {
    try {
      const response = await axios.post<{
        success: boolean;
        message?: string;
      }>("/registros", {
        usuario: user,
        password,
        name,
        weight,
        height,
        age,
        sex,
      });

      if (!response.data.success) {
        alert(`Registrado exitosamente, usuario: ${name}`);
        navigate("../login");
      } else {
        alert(`${response.data.message}`);
      }
    } catch (error) {
      alert("Hubo un error al intentar registrarse");
      console.error(error);
    }
  };

  // Tipo explícito para evitar error en onChange
  const handleGeneroChange = (genero: string) => {
    setSexo(genero);
  };

  return (
    // @ts-expect-error - el tipo de Card puede causar advertencias innecesarias
    <Card color="transparent" shadow={false}>
      {/* @ts-expect-error */}
      <Typography variant="h4">Registro</Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col gap-2">
        {/* @ts-expect-error */}
        <Input
          size="lg"
          label="Usuario"
          id="usuario"
          name="usuario"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsuario(e.target.value)
          }
        />
        {/* @ts-expect-error */}
        <Input
          type="password"
          size="lg"
          label="Contraseña"
          id="password"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContraseña(e.target.value)
          }
        />
        {/* @ts-expect-error */}
        <Input
          size="lg"
          id="name"
          name="name"
          type="text"
          label="Nombre y Apellido"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNombreApellido(e.target.value)
          }
        />
        {/* @ts-expect-error */}
        <Input
          size="lg"
          id="weight"
          name="weight"
          type="text"
          label="Peso"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPeso(e.target.value)
          }
        />
        {/* @ts-expect-error */}
        <Input
          size="lg"
          id="height"
          name="height"
          type="text"
          label="Estatura"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEstatura(e.target.value)
          }
        />
        {/* @ts-expect-error */}
        <Input
          size="lg"
          id="age"
          name="age"
          type="text"
          label="Edad"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEdad(e.target.value)
          }
        />

        {/* @ts-expect-error */}
        <List className="flex-row justify-around">
          {/* @ts-expect-error - Componentes Checkbox dan errores innecesarios */}
          <Checkbox
            checked={sex === "Masculino"}
            type="checkbox"
            label="Masculino"
            onChange={() => handleGeneroChange("Masculino")}
          />
          {/* @ts-expect-error */}
          <Checkbox
            checked={sex === "Femenino"}
            label="Femenino"
            type="checkbox"
            onChange={() => handleGeneroChange("Femenino")}
          />
        </List>

        {/* @ts-expect-error - Button lanza advertencias falsas */}
        <Button className="mt-6" fullWidth onClick={handleSubmit}>
          Crear cuenta
        </Button>
      </form>
      {/* @ts-expect-error */}
      <Typography color="gray" className="mt-4 text-center font-normal">
        <Link to="/login" className="font-medium text-gray-900 underline">
          Iniciar Sesión
        </Link>
      </Typography>
    </Card>
  );
}
