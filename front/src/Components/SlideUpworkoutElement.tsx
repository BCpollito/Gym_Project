import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Input,
  Textarea,
  Button,
  Chip,
} from "@material-tailwind/react";
import { X, LayoutList, CirclePause } from "lucide-react";
import { useState, useEffect } from "react";
import { PropsModal } from "../types/propsModal";
import axios from "axios";
import { Workout } from "../types/workout";
import { WorkoutElement } from "../types/WorkoutElement";
import { Descanso } from "../types/Descanso";
import { useNavigate } from "react-router-dom";

export default function SlideUpworkoutElement({
  open,
  onClose,
  idworkout,
  modo,
  refresh,
}: PropsModal) {
  const [nombre, setnombre] = useState<string>("");
  const [descripcion, setdescripcion] = useState<string>("");
  const [descanso, setdescanso] = useState<number>(0);
  const [orden, setorden] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nav = useNavigate();

  const chips = [
    { label: "0s", value: 0 },
    { label: "10s", value: 10 },
    { label: "15s", value: 15 },
    { label: "20s", value: 20 },
    { label: "25s", value: 25 },
    { label: "30s", value: 30 },
    { label: "35s", value: 35 },
    { label: "40s", value: 40 },
    { label: "45s", value: 45 },
    { label: "50s", value: 50 },
    { label: "55s", value: 55 },
    { label: "60s", value: 60 },
    { label: "90s", value: 90 },
    { label: "2m", value: 120 },
    { label: "3m", value: 180 },
    { label: "4m", value: 240 },
    { label: "5m", value: 300 },
  ];

  const handleRestTime = (
    value: { label: string; value: number },
    index: number
  ) => {
    setSelectedIndex(index);
    setdescanso(value.value);
  };

  const handleAddElement = async () => {
    if (modo === "Bloque") {
      const response = await axios.post<{
        success: boolean;
        message: string;
        newblock: Workout;
      }>("/bloques", {
        workoutID: idworkout,
        nombre: nombre,
        descripcion: descripcion,
      });

      const responseElement = await axios.post<{
        success: boolean;
        message: string;
        newElement: WorkoutElement;
      }>("/workoutElement", {
        workoutID: idworkout,
        tipo: modo,
        elementoID: response.data.newblock.id,
        orden: orden,
      });

      if (response.data.success) {
        if (responseElement.data.success) {
          const newOrden = orden + 1;
          setorden(newOrden);
          console.log(
            `Se agrego un nuevo elemento tipo: ${responseElement.data.newElement.tipo} al workoutde ID: ${responseElement.data.newElement.workoutID}`
          );
        }
        alert(`${response.data.message}`);
        setnombre("");
        setdescripcion("");
        onClose();
        refresh?.();
      }
    }

    if (modo === "Descanso") {
      console.log("DESCANSO");

      if (selectedIndex !== null) {
        const response = await axios.post<{
          newRest: Descanso;
          success: boolean;
          message: string;
        }>("/descansos", {
          workoutID: idworkout,
          duracionSegundos: descanso,
        });

        const responseElement = await axios.post<{
          success: boolean;
          message: string;
          newElement: WorkoutElement;
        }>("/workoutElement", {
          workoutID: idworkout,
          tipo: modo,
          elementoID: response.data.newRest.id,
          orden: orden,
        });

        if (response.data.success) {
          if (responseElement.data.success) {
            const newOrden = orden + 1;
            setorden(newOrden);
            console.log(
              `Se agrego un nuevo elemento tipo: ${responseElement.data.newElement.tipo} al workoutde ID: ${responseElement.data.newElement.workoutID}`
            );
          }
          setdescanso(0);
          onClose();
          refresh?.();
          alert(response.data.message);
        }
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        handler={onClose}
        animate={{
          mount: { y: 0 },
          unmount: { y: 500 },
        }}
        className="fixed bottom-0 w-full max-w-full m-0 rounded-t-2xl bg-white"
        style={{ maxHeight: "80vh", height: "auto" }}
      >
        <DialogHeader className="flex justify-between items-center w-full">
          <div className="w-6" />
          <div className="flex gap-1">
            {modo === "Bloque" && <LayoutList />}
            {modo === "Descanso" && <CirclePause />}
            <Typography variant="h6" className="text-center flex-1">
              {modo === "Bloque" && "Añadir Bloque"}
              {modo === "Descanso" && "Añadir Descanso"}
            </Typography>
          </div>
          <IconButton
            variant="text"
            className=" rounded-full"
            onClick={onClose}
          >
            <X />
          </IconButton>
        </DialogHeader>
        {modo === "Bloque" && (
          <DialogBody className="w-full p-5 pt-0 space-y-4 pb-6">
            <Typography color="black" variant="h6">
              Informacion del bloque
            </Typography>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Nombre
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="ej. Fuerza"
                value={nombre}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setnombre(e.target.value)
                }
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="text-left font-medium flex"
              >
                Descripcion
                <Typography color="gray" variant="small">
                  (Opcional)
                </Typography>
              </Typography>
              <Textarea
                rows={5}
                placeholder="ej. ejercicios Leves..."
                value={descripcion}
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setdescripcion(e.target.value)
                }
              />
            </div>
          </DialogBody>
        )}
        {modo === "Descanso" && (
          <DialogBody className="w-full p-5 pt-0 pb-6 flex gap-2 flex-wrap">
            {chips.map((value, index) => (
              <div
                className="rounded-full"
                onClick={() => handleRestTime(value, index)}
              >
                <Chip
                  key={index}
                  size="sm"
                  value={value.label}
                  variant={selectedIndex === index ? "filled" : "outlined"}
                  className="rounded-full"
                />
              </div>
            ))}
          </DialogBody>
        )}
        <DialogFooter className="flex items-center justify-center">
          <Button
            onClick={handleAddElement}
            color="orange"
            className="rounded-full w-full "
          >
            Continuar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
