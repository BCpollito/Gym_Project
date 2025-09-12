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
import { useWorkoutElementForm } from "../Hooks/useWorkoutElementForm";
import { PropsModal } from "../types/PropsModal";
import { chips } from "../types/RestTimes";

export default function SlideUpworkoutElement({
  open,
  onClose,
  idworkout,
  id,
  modo,
  refresh,
  elementorder,
  ejercicioExistente,
}: PropsModal) {
  const handleSuccess = () => {
    refresh?.();    // refresca los datos del listado
    onClose?.();    // cierra el modal
  };

  const {
    nombre, setNombre,
    descripcion, setDescripcion,
    series, setSeries,
    objetivo, setObjetivo,
    instrucciones, setInstrucciones,
    selectedIndex,
    disabled,
    handleRestTime,
    handleSubmit,
  } = useWorkoutElementForm({
    modo,
    idworkout,
    id,
    elementorder,
    ejercicioExistente,
    onSuccess: handleSuccess,
  });

  return (
    //@ts-ignore
    <Dialog open={open} handler={onClose} size="lg">
      {/*@ts-ignore*/}
      <DialogHeader className="flex justify-between items-center w-full">
        <div className="flex gap-1">
          {modo === "Bloque" && <LayoutList />}
          {modo === "Descanso" && <CirclePause />}
          {modo === "Ejercicio" && <BicepsFlexed />}
        </div>
        {/*@ts-ignore*/}
        <Typography variant="h6">
          {/*@ts-ignore*/}
          {modo === "Bloque" && "Agregar Bloque"}
          {modo === "Descanso" && "Agregar Descanso"}
          {modo === "Ejercicio" && "Agregar Ejercicio"}
        </Typography>
        {/*@ts-ignore*/}
        <IconButton variant="text" onClick={onClose}>
          <X />
        </IconButton>
      </DialogHeader>
      {/*@ts-ignore*/}
      <DialogBody className="flex flex-col gap-4 py-0">
        {modo === "Bloque" && (
          <>
            {/*@ts-ignore*/}
            <Input
              label="Nombre del bloque"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
            {/*@ts-ignore*/}
            <Textarea
              label="Descripción"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </>
        )}
        {modo === "Ejercicio" && (
          <>
            {/*@ts-ignore*/}
            <Typography color="black" variant="h6">
              {ejercicioExistente?.Nombre}
            </Typography>
            <div className="space-y-2">
              {/*@ts-ignore*/}
              <Input
                label="Series"
                type="number"
                onChange={e => setSeries(Number(e.target.value))}
                icon={<Repeat2 />}
              />
              {/*@ts-ignore*/}
              <Input
                label="Objetivo"
                type="number"
                onChange={e => setObjetivo(Number(e.target.value))}
                icon={<Goal />}
              />
            </div>
            <div>
              <div className="mb-1">Descanso:</div>
              <div className={`flex gap-2 flex-wrap px-3`}>
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
            </div>
            {/*@ts-ignore*/}
            <Textarea
              label="Instrucciones"
              value={instrucciones}
              onChange={e => setInstrucciones(e.target.value)}
            />
          </>
        )}
        {modo === "Descanso" && (
          <div className={`flex gap-2 flex-wrap`}>
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
        )}
      </DialogBody>
      {/*@ts-ignore*/}
      <DialogFooter>
        {/*@ts-ignore*/}
        <Button
          variant="gradient"
          color="blue"
          onClick={handleSubmit}
          disabled={disabled}
        >
          Agregar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
