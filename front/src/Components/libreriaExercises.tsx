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

export default function LibreriaExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const palabra = searchTerm.toLowerCase();
    const result = exercises.filter((exercise) => {
      const nombre = exercise.Nombre?.toLowerCase() || "";
      const tags =
        exercise.Tag?.toLowerCase()
          .split(",")
          .map((tag) => tag.trim()) || [];

      return (
        nombre.includes(palabra) || tags.some((tag) => tag.includes(palabra))
      );
    });
    setFilteredExercise(result);
  }, [searchTerm, exercises]);
  // también depende de ejercicios en caso de recarga

  return (
    <>
      <div>
        <Input
          variant="static"
          placeholder="Buscar por Nombre"
          containerProps={{ className: "mt-9" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <div className="max-h-[75vh]">
          {loading ? (
            <p>Cargando ejercicios...</p>
          ) : (
            <div className="flex flex-col items-center h-full gap-10 mt-4 p-4 overflow-y-auto max-h-[75vh]">
              {filteredExercise.map((exercise) => (
                <Card
                  key={exercise.ID_ejercicio}
                  className="w-full min-w-80 max-w-xs shadow-md"
                >
                  <CardHeader className="relative h-[163px] overflow-hidden">
                    {exercise.Link.includes("youtube.com/embed") ? (
                      <iframe
                        className="max-w-sm aspect-video"
                        src={exercise.Link}
                        title="YouTube video"
                      />
                    ) : (
                      <img
                        src={exercise.Link}
                        alt={exercise.Nombre}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 font-semibold"
                    >
                      {exercise.Nombre}
                    </Typography>
                    <div className="flex gap-2 flex-wrap">
                      {exercise.Tag.split(",").map((tag, index) => (
                        <Chip key={index} size="sm" value={tag.trim()} />
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
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
      <AddexerciseModal open={open} onClose={handleClose} />
    </>
  );
}
