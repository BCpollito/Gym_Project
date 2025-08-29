import {
  Card,
  Input,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CreateWorkoutModal from "./CreateWorkoutModal";
import ScrollToTopButton from "./ScrollToTopButton";
import { Workout } from "../types/workout";
import axios from "axios";

const TABLE_HEAD = [
  {
    head: "Nombre",
  },
  {
    head: "Descripción",
  },
];

const TABLE_ROWS = [
  {
    number: "#MS-415646",
    customer: "Viking Burrito",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
  },
  {
    number: "#QW-103578",
    customer: "Fiber Notion",
  },
  {
    number: "#MS-415688",
    customer: "Blue Bird",
  },
  ,
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
  },

  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
  },
];

export default function LibraryWorkout() {
  const [open, setOpen] = useState(false);

  const handleCreateWorkout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollRef = useRef<HTMLDivElement>(null)

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await axios.get<Workout[]>('/workouts');
        const WorkoutsData = response.data.sort((a, b) => b.id - a.id);
        setWorkouts(WorkoutsData);
      } catch (error) {
        console.error("Error al cargar Workouts: ", error)
      }
    }
    getWorkouts();
  }, [])

  return (
    <div className="max-h-[77vh]">
      <div className="flex pb-2 gap-2 items-center pr-4 pl-4 pt-2">
        {/*// @ts-ignore*/}
        <Button
          onClick={handleCreateWorkout}
          color="amber"
          size="sm"
          className="flex items-center justify-center gap-3 rounded-full h-8"
        >
          <Plus strokeWidth={3} /> Crear workout
        </Button>
        {/*// @ts-ignore*/}
        <Input label="Buscar Workout por nombre" />
      </div>
      {/*// @ts-ignore*/}
      <Card ref={scrollRef} className="h-full w-full sm:max-w-sm overflow-scroll">
        {/*// @ts-ignore*/}
        <CardBody className="max-w-sm max-h-[72vh] h-full py-2">
          <table className="w-full table-auto max-w-sm text-left">
            <thead>
              <tr>
                <th></th>
                {TABLE_HEAD.map(({ head }) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 text-center"
                  >
                    <div className="flex justify-center items-center gap-1">
                      {/*// @ts-ignore*/}
                      <Typography
                        color="blue-gray"
                        variant="small"
                        className="!font-bold"
                      >
                        {head}
                      </Typography>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workouts?.map((workout, index) => {
                const isLast = index === workouts.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-300";

                return (
                  <tr key={workout.id}>
                    <td>
                      <Button></Button>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        {/*// @ts-ignore*/}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {workout.nombre}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      {/*// @ts-ignore*/}
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {workout.descripcion || "sin descripcion"}
                      </Typography>
                    </td>
                  </tr>
                )

              }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <CreateWorkoutModal open={open} onClose={handleClose} />
      <div className="fixed bottom-[70px] right-4 z-50">
        <ScrollToTopButton scrollRef={scrollRef} />
      </div>
    </div>
  );
}
