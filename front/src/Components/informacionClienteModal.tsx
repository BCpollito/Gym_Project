// src/Components/informacionClienteModal.tsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cliente } from "../types/Cliente";
import { PropsModal } from "../types/PropsModal";

export function InformacionClienteModal({ open, onClose, id, workoutExistente }: PropsModal) {

  const [cliente, setCliente] = useState<Cliente | null>(null);

  const [assignDate, setAssignDate] = useState<Date | null>(null);

  useEffect(() => {
    async function DatosCliente() {
      try {
        const response = await axios.get('/registros/' + id);
        const clienteData = response.data;
        setCliente(clienteData);
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    };
    DatosCliente();
  }, [id]);

  const handleAssign = async () => {
    const currentDate = new Date();
    const currentFormatedDate = currentDate.toISOString().split("T")[0];
    const AssignedFormatedDate = assignDate !== null && (assignDate.toISOString().split("T")[0])

    if (assignDate === null || AssignedFormatedDate < currentFormatedDate) {
      return alert("Ingrese una fecha valida");
    }

    try {
      const response = await axios.post<{
        message: string;
        success: boolean;
        error: string
      }>('/assign-workout', {
        clienteID: id,
        workoutID: workoutExistente ? workoutExistente.id : null,
        dateAssign: AssignedFormatedDate
      });

      if (response.data.success === true) {
        onClose();
        return alert(response.data.message);
      }

      if (response.data.success === false) {
        return alert(response.data.message);
      }

      alert(response.data.error);
    } catch (error) {
      console.error(error)
      alert(`error en el servidor: ${error}`)
    }

  }

  return (
    <>
      {/*// @ts-ignore*/}
      <Dialog open={open} handler={onClose}>
        {/*// @ts-ignore*/}
        <DialogHeader>Información del cliente</DialogHeader>
        {/*// @ts-ignore*/}
        <DialogBody>
          <div>
            <p><strong>Nombre:</strong> {cliente?.name}</p>
            <p><strong>Peso:</strong> {cliente?.weight}</p>
            <p><strong>Altura:</strong> {cliente?.height}</p>
            <p><strong>Edad:</strong> {cliente?.age}</p>
            <p><strong>Sexo:</strong> {cliente?.sex}</p>
          </div>
        </DialogBody>
        {/*// @ts-ignore*/}
        <DialogFooter className="text-right">
          {/*// @ts-ignore*/}
          <Typography variant="h5" color="pink" className="line-clamp-2">
            {`¿Asignar Workout ${workoutExistente!.nombre}?`}
          </Typography>
          <div className="flex justify-center items-center gap-3 py-3">
            {/*// @ts-ignore*/}
            <Typography className="">
              {`Seleccionar fecha`}
            </Typography>
            <input type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssignDate(e.target.valueAsDate)}
            />
          </div>
          <div className="space-x-3">
            {/*// @ts-ignore*/}
            <Button size="sm" variant="gradient" color="red" onClick={onClose}>
              <span>Cancelar</span>
            </Button>
            {/*// @ts-ignore*/}
            <Button size="sm" variant="gradient" color="green" onClick={handleAssign}>
              <span>Confirmar</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}