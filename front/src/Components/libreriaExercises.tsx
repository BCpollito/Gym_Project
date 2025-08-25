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
import convertirLink from "../services/ConvertLink";

type Modo = "crear" | "Ver";

type props = {
  classNamemodify?: boolean;
  closeSelf?: () => void;
  ejercicioExistente?: (ejercicio: Exercise) => void;
};

export default function LibreriaExercises({
  classNamemodify,
  closeSelf,
  ejercicioExistente,
}: props) {
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

  const handleExerciseToBlock = (exercise: Exercise) => {
    if (exercise !== undefined) ejercicioExistente!(exercise);
    if (closeSelf !== undefined) closeSelf();
  };

  return (
    <>
      <div>
        {/*// @ts-ignore*/}
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
                // @ts-ignore
                <Card
                  key={exercise.ID_ejercicio}
                  className={`w-full min-w-80 max-w-xs shadow-md cursor-pointer bg-blue-gray-50 ${classNamemodify === true ? "flex flex-row items-center" : ""
                    }`}
                  onClick={
                    classNamemodify === true
                      ? () => handleExerciseToBlock(exercise)
                      : () => handleViewExercise(exercise)
                  }
                >
                  {/*// @ts-ignore*/}
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className={`overflow-hidden m-0 ${classNamemodify === true ? "rounded-r-none min-w-[100px] max-w-[100px] h-[80px]" : "h-[180px] rounded-none"
                      }`}
                  >
                    {(exercise.Link.includes("youtube.com/embed") && classNamemodify !== true) ? (
                      <iframe
                        className="w-full h-full aspect-video"
                        src={`${exercise.Link}?controls=1&modestbranding=1&rel=0&showinfo=0`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src={classNamemodify === true ? convertirLink(exercise.Link) || "" : exercise.Link}
                        alt={exercise.Nombre}
                        className={`h-full w-full bg-white ${classNamemodify === true
                          ? "object-cover"
                          : "object-contain"
                          }`}
                      />
                    )}
                  </CardHeader>
                  {/*// @ts-ignore*/}
                  <CardBody className={`py-1 ${classNamemodify === true && "flex justify-center items-center h-[80px] pl-0 pr-2 py-0 overflow-hidden"}`}>
                    {/*// @ts-ignore*/}
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className={`mb-1 font-semibold line-clamp-2 ${classNamemodify === true && "ml-5 mb-0"}`}
                    >
                      {exercise.Nombre}
                    </Typography>
                    {classNamemodify !== true && (
                      <div className={`flex gap-2 flex-wrap`}>
                        {exercise.Tag.split(",").map((tag, index) => (
                          <Chip
                            className={`text-[10px] leading-3 } `}
                            variant={"filled"}
                            key={index}
                            size="sm"
                            value={tag.trim()}
                          />
                        ))}
                      </div>
                    )
                    }
                  </CardBody>
                </Card>
              ))}
              <div className="h-4"></div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-[75px] right-4">
        {/*// @ts-ignore*/}
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
