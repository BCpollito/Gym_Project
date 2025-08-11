import {
  IconButton,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import AddexerciseModal from "./addExerciseModal";
import { Exercise } from "../types/Exercises";

type Modo = "crear" | "Ver";

type props = {
  classNamemodify?: boolean;
};

export default function LibreriaExercises({ classNamemodify }: props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState<Modo>("crear");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredExercise, setFilteredExercise] = useState<Exercise[]>([]);

  useEffect(() => {
    if (!open) {
      axios
        .get("/ejercicio")
        .then((res) => {
          const data = res.data;
          if (
            Array.isArray(data) &&
            data.every((e) => "ID_ejercicio" in e && "Nombre" in e)
          ) {
            const exercisesData = data as Exercise[];
            setExercises(
              exercisesData.sort((a, b) => b.ID_ejercicio - a.ID_ejercicio)
            );
          }

          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open]);

  const handleClickCreate = () => {
    setOpen(true);
    setModo("crear");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExercise(null);
  };

  useEffect(() => {
    const palabras = searchTerm
      .toLowerCase()
      .split(" ") // Divide el searchTerm en palabras usando el espacio como delimitador
      .map((palabra) => palabra.trim()); // Elimina espacios adicionales

    const result = exercises.filter((exercise) => {
      const nombre = exercise.Nombre?.toLowerCase() || "";
      const tags =
        exercise.Tag?.toLowerCase()
          .split(",")
          .map((tag) => tag.trim()) || [];

      // Verifica si al menos uno de los términos de búsqueda coincide con el nombre o las etiquetas
      return (
        palabras.some((palabra) => nombre.includes(palabra)) ||
        palabras.some((palabra) => tags.some((tag) => tag.includes(palabra)))
      );
    });

    setFilteredExercise(result);
  }, [searchTerm, exercises]); // también depende de ejercicios en caso de recarga

  const handleViewExercise = (exercise: Exercise) => {
    setOpen(true);
    setModo("Ver");
    setSelectedExercise(exercise);
  };

  return (
    <>
      <div>
        <Input
          variant="static"
          placeholder="Buscar por Nombre"
          containerProps={{
            className: `${classNamemodify === true ? "mt-0" : "mt-9"}`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <div className="max-h-[75vh]">
          {loading ? (
            <p>Cargando ejercicios...</p>
          ) : (
            <div className="flex flex-col items-center h-full gap-5 mt-4 pb-4 px-4 overflow-y-auto max-h-[75vh]">
              {filteredExercise.map((exercise) => (
                <Card
                  key={exercise.ID_ejercicio}
                  className="w-full min-w-80 max-w-xs shadow-md cursor-pointer bg-blue-gray-50"
                  onClick={() => handleViewExercise(exercise)}
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="relative h-[180px] overflow-hidden m-0 rounded-none"
                  >
                    {exercise.Link.includes("youtube.com/embed") ? (
                      <iframe
                        className="max-w-sm aspect-video"
                        src={`${exercise.Link}?controls=1&modestbranding=1&rel=0&showinfo=0`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src={exercise.Link}
                        alt={exercise.Nombre}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </CardHeader>
                  <CardBody className="py-1">
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 font-semibold"
                    >
                      {exercise.Nombre}
                    </Typography>
                    <div className="flex gap-2 flex-wrap">
                      {exercise.Tag.split(",").map((tag, index) => (
                        <Chip
                          className="text-[10px] leading-3"
                          key={index}
                          size="sm"
                          value={tag.trim()}
                        />
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
              <div className="h-4"></div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-[75px] right-4">
        <IconButton
          onClick={handleClickCreate}
          color="amber"
          className="rounded-full"
          aria-label="Agregar nuevo ejercicio"
        >
          <Plus />
        </IconButton>
      </div>
      <AddexerciseModal
        open={open}
        onClose={handleClose}
        modo={modo}
        ejercicioExistente={selectedExercise}
      />
    </>
  );
}
