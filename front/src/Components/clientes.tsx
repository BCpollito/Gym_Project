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
  Input
} from "@material-tailwind/react";
import { Cliente } from "../types/Cliente";
import { EllipsisVertical, BookText, UserSearch } from "lucide-react";
import { InformacionClienteModal } from "./informacionClienteModal";

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [mostrarInformacion, setMostrarInformacion] = useState(false);
  const [id, setid] = useState<number>(0);

  const getClients = async () => {
    try {
      // Realiza la solicitud a la API
      const response = await axios.get<Cliente[]>("/registros");
      const clientsData = response.data.sort((a, b) => b.id - a.id); // Aquí asigno directamente la respuesta
      setClientes(clientsData); // Almacena los clientes en el estado
      setFilteredClientes(clientsData);
      console.log(clientsData);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    setid(Number(event.currentTarget.id));
    setMostrarInformacion(true);
  };

  const handleClose = () => {
    setMostrarInformacion(false);
  };

  useEffect(() => {
    const palabra = searchTerm.toLowerCase();
    const result = clientes.filter(cliente =>
      cliente.name.toLowerCase().includes(palabra)
    );
    setFilteredClientes(result);
  }, [searchTerm, clientes]); // también depende de clientes en caso de recarga

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-8 h-full">
        <h1 className="text-2xl font-bold text-center mt-8">Clientes</h1>
        <div className="px-4">
          {/*// @ts-ignore*/}
          <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            icon={<UserSearch />} variant="outlined" label="Buscar Cliente" placeholder="Nombre" className="bg-white" />
        </div>

        {/* @ts-expect-error */}
        <List>
          {filteredClientes.map((cliente) => {
            if (!cliente.isAdmin) {
              return (
                // @ts-ignore
                <ListItem
                  key={cliente.id}
                  className="flex items-center justify-between gap-4 border 
              border-black rounded-lg px-3 py-2 bg-white hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="sm:text-base text-gray-800 font-medium">
                    {cliente.name}
                  </span>
                  {/* @ts-expect-error */}
                  <ListItemSuffix>
                    <Menu>
                      <MenuHandler>
                          <EllipsisVertical />
                      </MenuHandler>
                      {/* @ts-expect-error */}
                      <MenuList className="w-0 p-0">
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

      {mostrarInformacion === true &&
        <InformacionClienteModal
          open={mostrarInformacion}
          onClose={handleClose}
          id={id}
        />
      }
    </>
  );
}
