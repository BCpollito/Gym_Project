import axios from "axios";
import { useEffect, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Cliente } from "../types/Cliente";
import { EllipsisVertical, BookText } from "lucide-react";
import { InformacionClienteModal } from "./informacionClienteModal";

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mostrarInformacion, setMostrarInformacion] = useState(false);
  const [id, setid] = useState<number>(0);

  useEffect(() => {
    async function getClients() {
      try {
        // Realiza la solicitud a la API
        const response = await axios.get<Cliente[]>("/registros");
        const clientsData = response.data; // Aquí asigno directamente la respuesta
        setClientes(clientsData); // Almacena los clientes en el estado
        console.log(clientsData);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    }

    getClients();
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    setid(Number(event.currentTarget.id));
    setMostrarInformacion(true);
  };

  const handleClose = () => {
    setMostrarInformacion(false);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-8 h-full">
        <h1 className="text-2xl font-bold text-center mt-8">Clientes</h1>
        {/* @ts-expect-error */}
        <List>
          {clientes.map((cliente) => {
            if (!cliente.isAdmin) {
              return (
                <ListItem
                  key={cliente.id}
                  className="flex items-center justify-between gap-4 border 
              border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="sm:text-base text-gray-800 font-medium">
                    {cliente.name}
                  </span>
                  {/* @ts-expect-error */}
                  <ListItemSuffix>
                    <Menu>
                      <MenuHandler>
                        {/* @ts-expect-error */}
                        <IconButton
                          size="sm"
                          variant="outlined"
                          className="rounded-full"
                        >
                          <EllipsisVertical />
                        </IconButton>
                      </MenuHandler>
                      {/* @ts-expect-error */}
                      <MenuList className="w-0">
                        {/* @ts-expect-error */}
                        <MenuItem
                          id={String(cliente.id)}
                          onClick={handleClick}
                          className="flex items-center gap-2"
                        >
                          <BookText size={16} /> Ver Información
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </ListItemSuffix>
                </ListItem>
              );
            }
          })}
        </List>
      </div>

      <InformacionClienteModal
        open={mostrarInformacion}
        onClose={handleClose}
        id={id}
      />
    </>
  );
}
