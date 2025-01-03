import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TABLE_HEAD = ["Nombre", "Descripción"];
export default function Userpage() {
  const { usuarioid } = useParams();
  const [cliente, setCliente] = useState({});
  const [semanas, setSemanas] = useState([]);
  const [isModalOpenDescripcion, setisModalOpenDescripcion] = useState(false);
  const [description, setdescripcion] = useState("");

  useEffect(() => {
    async function getClient() {
      try {
        const response = await axios.get(`/registros/${usuarioid}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    }
    getClient();
  }, [usuarioid]);

  useEffect(() => {
    async function getSemanas() {
      try {
        const response = await axios.get(`/clientes/${usuarioid}/semanas`);
        setSemanas(response.data);
      } catch (error) {
        console.error("Error al obtener las semanas:", error);
      }
    }
    getSemanas();
  }, [usuarioid]);

  const [open, setOpen] = useState();
  const [openDia, setOpenDia] = useState();
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpenDia = (value) => setOpenDia(openDia === value ? 0 : value);

  if (!usuarioid) {
    return <div>No se encontró ningún cliente</div>;
  }

  function HandleViewDescription(descripcion) {
    setisModalOpenDescripcion((e) => !e);
    setdescripcion(descripcion);
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen relative">
      <div>
        <Typography variant="h2" className="text-center">
          !Bienvenido {cliente.name}
        </Typography>
      </div>

      {semanas.map((semana) => (
        <Accordion key={semana.ID_semana} open={open === semana.ID_semana}>
          <AccordionHeader
            className="uppercase "
            onClick={() => handleOpen(semana.ID_semana)}
          >
            {semana.Nombre}
          </AccordionHeader>
          <AccordionBody>
            {semana.Dia.map((dia) => (
              <Accordion key={dia.ID_dia} open={openDia === dia.ID_dia}>
                <AccordionHeader onClick={() => handleOpenDia(dia.ID_dia)}>
                  {dia.Dia}
                </AccordionHeader>
                <AccordionBody>
                  <table className="w-full text-left table-auto min-w-max">
                    <thead>
                      <tr className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                          >
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                              {head}
                            </p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dia.Ejercicios.map((ejercicio) => (
                        <tr key={ejercicio.ID_ejercicio}>
                          <td className="p-4 border-b border-blue-gray-50">
                            {ejercicio.Nombre}
                          </td>
                          <td
                            onClick={() =>
                              HandleViewDescription(ejercicio.Descripcion)
                            }
                            className="p-4 border-b border-blue-gray-50 whitespace-nowrap overflow-hidden max-w-48 text-ellipsis hover:font-bold hover:text-blue-800"
                          >
                            {ejercicio.Descripcion}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionBody>
              </Accordion>
            ))}
          </AccordionBody>
        </Accordion>
      ))}

      {/*Modal mostrar descripcion*/}
      <Dialog open={isModalOpenDescripcion} handler={HandleViewDescription}>
        <DialogHeader>DESCRIPCION</DialogHeader>
        <DialogBody>
          <Typography className="whitespace-normal break-words" variant="lead">
            {description}
          </Typography>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={HandleViewDescription}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
          </DialogFooter>
        </DialogBody>
      </Dialog>
    </div>
  );
}
