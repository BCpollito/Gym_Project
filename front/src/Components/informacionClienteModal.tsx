// src/Components/informacionClienteModal.tsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cliente } from "../types/Cliente";
import { PropsModal } from "../types/propsModal";

export function InformacionClienteModal({ open, onClose, id }: PropsModal) {

  const[cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    async function DatosCliente(){
      try{
        const response = await axios.get('/registros/' + id);
        const clienteData = response.data;
        setCliente(clienteData);
      }catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    };
    DatosCliente();
  },[id]);

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Información del cliente</DialogHeader>
      <DialogBody>
        <div>
          <p><strong>Nombre:</strong> {cliente?.name}</p>
          <p><strong>Peso:</strong> {cliente?.weight}</p>
          <p><strong>Altura:</strong> {cliente?.height}</p>
          <p><strong>Edad:</strong> {cliente?.age}</p>
          <p><strong>Sexo:</strong> {cliente?.sex}</p>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="green" onClick={onClose}>
          <span>Confirmar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
