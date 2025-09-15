import {
  Input,
  Button,
  IconButton,
  Dialog,
  Textarea,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { Trash } from "lucide-react";
import { PropsModal } from "../types/PropsModal";
import { useAddExerciseModal } from "../Hooks/useAddExerciseModal";
import { TagsInput } from "./TagsInput";

export default function AddexerciseModal(props: PropsModal) {
  const {
    ejercicio,
    setEjercicio,
    link,
    setLink,
    etiqueta,
    setEtiqueta,
    convertedLink,
    modoEditar,
    setModoEditar,
    handleCreate,
    handleEditExercise,
    handleDeleteExercise,
    handleAddTag,
    handleDeleteTag,
    onClose,
    modo,
    ejercicioExistente,
  } = useAddExerciseModal(props);

  const editable = modo === "crear" || modoEditar;

  return (
    //@ts-ignore
    <Dialog size="sm" open={props.open} handler={onClose} className="p-4 max-h-[85vh]">
      {/*@ts-ignore*/}
      <DialogHeader className="relative m-0 flex justify-between">
        {/*@ts-ignore*/}
        <Typography variant="h4" color="blue-gray">
          {modoEditar ? "Editar ejercicio" : modo === "Ver" ? "Ver Ejercicio" : "Crear Ejercicio"}
        </Typography>
        {modoEditar && (
          //@ts-ignore
          <IconButton color="red" onClick={handleDeleteExercise} size="sm">
            <Trash />
          </IconButton>
        )}
      </DialogHeader>
      {/*@ts-ignore*/}
      <DialogBody className="space-y-4 pb-6 overflow-y-auto max-h-[60vh]">
        {/* Nombre */}
        <div>
          {/*@ts-ignore*/}
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Nombre
          </Typography>
          {/*@ts-ignore*/}
          <Input
            color="gray"
            size="lg"
            placeholder="ej. Pull over"
            value={ejercicio.Nombre}
            disabled={!editable}
            className="placeholder:opacity-100"
            containerProps={{ className: "!min-w-full" }}
            labelProps={{ className: "hidden" }}
            onChange={(e) => setEjercicio({ ...ejercicio, Nombre: e.target.value })}
          />
        </div>
        {/* Link */}
        <div>
          {/*@ts-ignore*/}
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Link (imagen o video)
          </Typography>
          {/*@ts-ignore*/}
          <Input
            color="gray"
            size="lg"
            placeholder="https://www.youtube.com/watch?v=example"
            value={convertedLink || link || ""}
            disabled={!editable}
            className="placeholder:opacity-100"
            containerProps={{ className: "!min-w-full" }}
            labelProps={{ className: "hidden" }}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        {/* Etiquetas */}
        {/*@ts-ignore*/}
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 text-left font-medium"
        >
          Etiqueta
        </Typography>
        <TagsInput
          etiqueta={etiqueta}
          setEtiqueta={setEtiqueta}
          tags={ejercicio.Tag}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
          editable={editable}
        />
        {/* Descripción */}
        <div>
          {/*@ts-ignore*/}
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Descripcion (Opcional)
          </Typography>
          {/*@ts-ignore*/}
          <Textarea
            rows={7}
            placeholder="ej. Ejercicio para espalda enfocado en dorsales..."
            value={ejercicio.Descripcion}
            disabled={!editable}
            className="!w-full !border-[1.5px] bg-white text-gray-600"
            labelProps={{ className: "hidden" }}
            onChange={(e) => setEjercicio({ ...ejercicio, Descripcion: e.target.value })}
          />
        </div>
        {/* Vista previa */}
        <div className="flex flex-col items-center justify-center">
          {convertedLink === null && link ? (
            //@ts-ignore
            <Typography color="red" variant="h6">
              URL no válida
            </Typography>
          ) : (convertedLink && convertedLink.includes("youtube.com/embed")) ||
            ejercicioExistente?.Link.includes("youtube.com/embed") ? (
            <iframe className="max-w-sm aspect-video" src={convertedLink || ""} title="YouTube video" allowFullScreen />
          ) : convertedLink ? (
            <img className="max-w-sm" src={convertedLink} alt="Imagen no encontrada" />
          ) : null}
        </div>
      </DialogBody>
      {/*@ts-ignore*/}
      <DialogFooter className="flex ">
        {/*@ts-ignore*/}
        <Button variant="text" className="hover:bg-blue-gray-600 hover:text-white" onClick={onClose}>
          Cancelar
        </Button>
        {modo === "crear" ? (
          //@ts-ignore
          <Button onClick={handleCreate} className="ml-auto">
            Crear
          </Button>
        ) : (
          //@ts-ignore
          <Button
            color={modoEditar ? "green" : "black"}
            variant={modoEditar ? "outlined" : "filled"}
            onClick={!modoEditar ? () => setModoEditar(true) : handleEditExercise}
            className="ml-auto"
          >
            {modoEditar ? "Guardar" : "Editar"}
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
