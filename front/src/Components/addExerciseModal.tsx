import {
  Input,
  Button,
  IconButton,
  Chip,
  Dialog,
  Textarea,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { Plus, X, Trash } from "lucide-react";
import { PropsModal } from "../types/propsModal";
import convertirLink from "../services/ConvertLink";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Exercise } from "../types/Exercises";

export default function AddexerciseModal({
  open,
  onClose,
  modo, // Aquí recibimos el prop modo, pero ya no lo usaremos tanto directamente
  ejercicioExistente,
}: PropsModal) {
  const [link, setlink] = useState<string | null>(null);
  const [etiqueta, setEtiqueta] = useState<string>("");
  const [convertedLink, setConvertedLink] = useState<string | null>(null);
  const [ejercicio, setEjercicio] = useState<Exercise>({
    ID_ejercicio: 0,
    Nombre: "",
    Descripcion: "",
    Link: "",
    Tag: [],
  });

  const [modoeditar, setmodoeditar] = useState(false); // Estado local para manejar la edición

  // Este useEffect se ejecutará cada vez que cambie el `open` o el `modo`
  useEffect(() => {
    if (open) {
      if (modo === "Ver" && ejercicioExistente) {
        setEjercicio({
          ...ejercicio,
          ID_ejercicio: ejercicioExistente.ID_ejercicio,
          Nombre: ejercicioExistente.Nombre,
          Descripcion: ejercicioExistente.Descripcion,
          Link: ejercicioExistente.Link,
          Tag: ejercicioExistente.Tag.split(","),
        });
        setConvertedLink(ejercicioExistente.Link);
        setmodoeditar(false); // En modo "Ver", no editamos
      } else {
        setEjercicio({
          ID_ejercicio: 0,
          Nombre: "",
          Descripcion: "",
          Link: "",
          Tag: [],
        });
        setConvertedLink(null);
        setlink(null);
        setmodoeditar(false); // En modo "Crear", iniciamos en modo edición
      }
    }
  }, [open, modo, ejercicioExistente]);

  // Cambiar el link y convertirlo
  useEffect(() => {
    if (link) {
      const result = convertirLink(link);
      setConvertedLink(result);
      setEjercicio({
        ...ejercicio,
        Link: result || "",
      });
    } else {
      setConvertedLink(null);
    }
  }, [link]);

  const handleCreate = async () => {
    try {
      const response = await axios.post<{
        success: boolean;
        message?: string;
      }>("/ejercicio", {
        Nombre: ejercicio.Nombre,
        Descripcion: ejercicio.Descripcion,
        Link: ejercicio.Link,
        Tag: ejercicio.Tag.join(","),
      });

      if (response.data.success) {
        setEjercicio({
          ...ejercicio,
          Nombre: "",
          Descripcion: "",
          Link: "",
          Tag: [],
        });
        onClose();
      }

      alert(`${response.data.message}`);
    } catch (error) {
      console.error("Error al crear el ejercicio:", error);
    }
  };

  const handleAddTag = () => {
    if (etiqueta.trim()) {
      setEjercicio((prev) => ({
        ...prev,
        Tag: [...prev.Tag, etiqueta],
      }));
    }
    setEtiqueta("");
  };

  const handleDeletTag = (event: React.MouseEvent) => {
    const index = Number(event.currentTarget.id);
    setEjercicio((prev) => ({
      ...prev,
      Tag: prev.Tag.filter((_, i) => i !== index),
    }));
  };

  const handleEditExercise = async () => {
    try {
      const response = await axios.put<{
        success: boolean;
        message?: string;
      }>(`/ejercicio/${ejercicioExistente?.ID_ejercicio}`, {
        Nombre: ejercicio.Nombre,
        Descripcion: ejercicio.Descripcion,
        Link: ejercicio.Link,
        Tag: ejercicio.Tag.join(","),
      });

      if (response.data.success) {
        setEjercicio({
          ...ejercicio,
          Nombre: "",
          Descripcion: "",
          Link: "",
          Tag: [],
        });
        onClose();
      }

      alert(`${response.data.message}`);
    } catch (error) {
      console.error("Error al crear el ejercicio:", error);
    }
  };

  const handleDeletExercise = async () => {
    const sino = window.confirm("Seguro que deseas eliminar?");
    if (sino) {
      try {
        const response = await axios.delete<{
          message: string;
          error: string;
        }>(`/ejercicio/${ejercicioExistente?.ID_ejercicio}`)

        if (response.data.message) {
          window.alert(`${response.data.message}`);
          onClose();
        }
        if (response.data.error) {
          window.alert(`${response.data.error}`);
        }
      } catch (error) {
        console.error("Error al crear el ejercicio:", error);
      }
    }
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={onClose}
      className="p-4 max-h-[85vh]"
    >
      <DialogHeader className="relative m-0 flex justify-between">
        <Typography variant="h4" color="blue-gray">
          {modoeditar
            ? "Editar ejercicio"
            : modo === "Ver"
            ? "Ver Ejercicio"
            : "Crear Ejercicio"}
        </Typography>
        {modoeditar && 
        <IconButton
        color="red"
        onClick={handleDeletExercise}
        size="sm">
          <Trash />
        </IconButton>
        }        
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6 overflow-y-auto max-h-[60vh]">
        {/* Resto de campos */}
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
            placeholder="ej. Pull over"
            value={ejercicio.Nombre}
            disabled={modo !== "crear" && !modoeditar} // Solo editable si estamos en "crear" o "editar"
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEjercicio({
                ...ejercicio,
                Nombre: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Link (imagen o video)
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="https://www.youtube.com/watch?v=example"
            value={convertedLink || link || ""}
            disabled={modo !== "crear" && !modoeditar}
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setlink(e.target.value)
            }
          />
        </div>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Etiqueta
          </Typography>

          {(modo === "crear" || modoeditar) && (
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                placeholder="ej. pecho, hipertrofia..."
                color="gray"
                value={etiqueta}
                className="pr-20 placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEtiqueta(e.target.value)
                }
              />
              <IconButton
                size="sm"
                color={etiqueta ? "amber" : "gray"}
                disabled={!etiqueta}
                className="!absolute right-1 top-1 rounded"
                onClick={handleAddTag}
              >
                <Plus />
              </IconButton>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {ejercicio.Tag.map((tag, index) => (
            <Chip
              key={index}
              size="sm"
              value={tag}
              icon={
                (modo === "crear" || modoeditar) && (
                  <IconButton
                    id={String(index)}
                    onClick={handleDeletTag}
                    color="white"
                    variant="text"
                    className="mb-[2px] w-3 h-3"
                  >
                    <X size={15} strokeWidth="3px" />
                  </IconButton>
                )
              }
            />
          ))}
        </div>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Descripcion (Opcional)
          </Typography>
          <Textarea
            rows={7}
            placeholder="ej. Ejercicio para espalda enfocado en dorsales..."
            value={ejercicio.Descripcion}
            disabled={modo === "crear" || modoeditar ? false : true}
            className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
            labelProps={{
              className: "hidden",
            }}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEjercicio({
                ...ejercicio,
                Descripcion: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {convertedLink === null && link ? (
            <Typography color="red" variant="h6">
              URL no válida
            </Typography>
          ) : (convertedLink && convertedLink.includes("youtube.com/embed")) ||
            ejercicioExistente?.Link.includes("youtube.com/embed") ? (
            <iframe
              className="max-w-sm aspect-video"
              src={convertedLink || ""}
              title="YouTube video"
              allowFullScreen
            />
          ) : convertedLink ? (
            <img
              className="max-w-sm"
              src={convertedLink}
              alt="Imagen no encontrada"
            />
          ) : null}
        </div>
      </DialogBody>
      <DialogFooter className="flex ">
        <Button
          variant="text"
          className="hover:bg-blue-gray-600 hover:text-white"
          onClick={onClose}
        >
          Cancelar
        </Button>
        {modo === "crear" ? (
          <Button onClick={handleCreate} className="ml-auto">
            Crear
          </Button>
        ) : (
            <Button color={modoeditar ? "green" : "black"} variant={modoeditar ? "outlined" : "filled"}
              onClick={
                !modoeditar ? () => setmodoeditar(true) : handleEditExercise
              }
              className="ml-auto"
            >
              {modoeditar ? "Guardar" : "Editar"}
            </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
