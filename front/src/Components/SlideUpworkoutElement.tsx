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
import {
  X,
  LayoutList,
  CirclePause,
  BicepsFlexed,
  Goal,
  Repeat2,
  NotebookText
} from "lucide-react";
import { useState, useEffect } from "react";
import { PropsModal } from "../types/propsModal";
import axios from "axios";
import { Workout } from "../types/workout";
import { WorkoutElement } from "../types/WorkoutElement";
import { Descanso } from "../types/Descanso";
import { chips } from "../types/RestTimes";

export default function SlideUpworkoutElement({
  open,
  onClose,
  idworkout,
  modo,
  refresh,
  elementorder,
  ejercicioExistente,
}: PropsModal) {
  const [nombre, setnombre] = useState<string>("");
  const [descripcion, setdescripcion] = useState<string>("");
  const [descanso, setdescanso] = useState<number>(0);
  const [series, setseries] = useState<number>(0);
  const [objetivo, setobjetivo] = useState<number>(0)
  const [instrucciones, setinstrucciones] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
        orden: elementorder! + 1,
      });

      if (response.data.success) {
        if (responseElement.data.success) {
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
          orden: elementorder! + 1,
        });

        if (response.data.success) {
          if (responseElement.data.success) {
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
      {/*// @ts-ignore*/}
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
        {/*// @ts-ignore*/}
        <DialogHeader className="flex justify-between items-center w-full">
          <div className="w-6" />
          <div className="flex gap-1">
            {modo === "Bloque" && <LayoutList />}
            {modo === "Descanso" && <CirclePause />}
            {modo === "Ejercicio" && <BicepsFlexed />}
            {/*// @ts-ignore*/}
            <Typography variant="h6" className="text-center flex-1">
              {modo === "Bloque" && "Añadir Bloque"}
              {modo === "Descanso" && "Añadir Descanso"}
              {modo === "Ejercicio" && "Añadir ejercicio"}
            </Typography>
          </div>
          {/*// @ts-ignore*/}
          <IconButton
            variant="text"
            className=" rounded-full"
            onClick={onClose}
          >
            <X />
          </IconButton>
        </DialogHeader>
        {modo === "Bloque" && (
          // @ts-ignore
          <DialogBody className="w-full p-5 pt-0 space-y-4 pb-6">
            {/*// @ts-ignore*/}
            <Typography color="black" variant="h6">
              Informacion del bloque
            </Typography>
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
              {/*// @ts-ignore*/}
              <Typography
                variant="small"
                color="blue-gray"
                className="text-left font-medium flex"
              >
                Descripcion
                {/*// @ts-ignore*/}
                <Typography color="gray" variant="small">
                  (Opcional)
                </Typography>
              </Typography>
              {/*// @ts-ignore*/}
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
        {(modo === "Descanso" || modo === "Ejercicio") && (
          // @ts-ignore
          <DialogBody className="w-full p-5 pt-0 pb-6">
            {modo === "Ejercicio" &&
              (
                <>
                  {/*// @ts-ignore*/}
                  <Typography color="black" variant="h6">
                    {ejercicioExistente?.Nombre}
                  </Typography>
                  <div>
                    {/*// @ts-ignore*/}
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium flex items-center"
                    >
                      <Repeat2 size={18} />
                      Series
                    </Typography>
                    {/*// @ts-ignore*/}
                    <Input
                      color="gray"
                      size="lg"
                      placeholder="ej. 3"
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
                      className="text-left font-medium flex"
                    >
                      <Goal size={18} />
                      Objetivo
                    </Typography>
                    {/*// @ts-ignore*/}
                    <Input
                      color="gray"
                      size="lg"
                      placeholder="ej. 3"
                      value={nombre}
                      className="placeholder:opacity-100 focus:!border-t-gray-900"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                </>
              )
            }
            <div className={`flex gap-2 flex-wrap ${modo === "Ejercicio" && "py-3"}`}>
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
            </div>
            
            {modo === "Ejercicio" &&
              (
                <>
                  <div>
                    {/*// @ts-ignore*/}
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-left font-medium flex"
                    >
                    <NotebookText size={18}/>
                      instrucciones adicionales
                    </Typography>
                    {/*// @ts-ignore*/}
                    <Textarea
                      rows={5}
                      placeholder="se puede detallar en que va a consistir la sesion etc..."
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
                </>)
            }
          </DialogBody>
        )}
        {/*// @ts-ignore*/}
        <DialogFooter className="flex items-center justify-center">
          {/*// @ts-ignore*/}
          <Button
            onClick={handleAddElement}
            color="orange"
            className="rounded-full w-full "
          >
            Continuar
          </Button>
        </DialogFooter>
      </Dialog >
    </>
  );
}
