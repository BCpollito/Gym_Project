import React, { useState } from "react";
import {
  Input,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { PropsModal } from "../types/PropsModal";
import { ArrowLeftToLine } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout";

export default function CreateWorkoutModal({ open, onClose }: PropsModal) {
  const [nombre, setnombre] = useState<string>("");
  const [descripcion, setdescripcion] = useState<string | null>("");

  const navigate = useNavigate();

  const handleCreateWorkout = async () => {
    try {
      const response = await axios.post<{
        success: boolean;
        message: string;
        newWorkout: Workout;
      }>("/workouts", {
        nombre: nombre,
        descripcion: descripcion,
      });

      if (response.data.success) {
        setnombre("");
        setdescripcion("");
        onClose();
        navigate(`/workout/${response.data.newWorkout.id}`);
      }
      alert(response.data.message);
    } catch (error) {
      console.error("Error al crear el Workout:", error);
    }
  };

  return (
    <>
      {/*// @ts-ignore*/}
      <Dialog size="sm" open={open} handler={onClose} className="p-4">
        {/*// @ts-ignore*/}
        <DialogHeader className="relative m-0 block">
          {/*// @ts-ignore*/}
          <IconButton onClick={onClose} variant="text" className="rounded-full">
            <ArrowLeftToLine />
          </IconButton>
          {/*// @ts-ignore*/}
          <Typography variant="h4" color="blue-gray">
            Crear Nuevo Workout
          </Typography>
          {/*// @ts-ignore*/}
          <Typography className="mt-1 font-normal text-gray-600">
            Informacion Basica de tu workout
          </Typography>
        </DialogHeader>
        {/*// @ts-ignore*/}
        <DialogBody className="space-y-4 pb-6">
          <div>
            {/*// @ts-ignore*/}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Nombre
            </Typography>
            {/*// @ts-ignore*/}
            <Input
              color="gray"
              size="lg"
              placeholder="ej. Dia de espalda"
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
            {/*// @ts-ignore*/}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Descripcion (Optional)
            </Typography>
            {/*// @ts-ignore*/}
            <Textarea
              rows={7}
              placeholder="ej. Sesion de entrenamiento enfocada en hipertrofia y bombeo..."
              value={descripcion || ""}
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
        {/*// @ts-ignore*/}
        <DialogFooter className="flex items-center justify-center">
          {/*// @ts-ignore*/}
          <Button
            disabled={nombre ? false : true}
            color="orange"
            className="rounded-full w-full "
            onClick={handleCreateWorkout}
          >
            Continuar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
