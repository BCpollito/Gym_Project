import {
  Card,
  Input,
  Typography,
  CardBody,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Plus, EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function LibraryWorkout() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [refreshdata, setRefreshdata] = useState<boolean>(false);

  const handleCreateWorkout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await axios.get<Workout[]>('/workouts');
        const WorkoutsData = response.data.sort((a, b) => b.id - a.id);
        setWorkouts(WorkoutsData);
        setFilteredWorkouts(WorkoutsData);
      } catch (error) {
        console.error("Error al cargar Workouts: ", error)
      }
    }
    getWorkouts();
  }, [refreshdata]);

  useEffect(() => {
    const palabra = searchTerm.toLowerCase();
    const result = workouts.filter(workout =>
      workout.nombre.toLowerCase().includes(palabra)
    );
    setFilteredWorkouts(result);
  }, [searchTerm, workouts]);

  const DeleteWorkout = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este workout?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete<{
        message: string;
        error?: string;        
      }>(`/workouts/${id}`);

      if (response.data.message) {
        alert(response.data.message);
        setRefreshdata(!refreshdata);        
      }
      if (response.data.error) {
          window.alert(`${response.data.error}`);
        }
    } catch (error) {
      alert(error);
      console.error("Error al eliminar el workout: ", error)
    }
  }

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
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          label="Buscar Workout por nombre"
        />
      </div>
      {/*// @ts-ignore*/}
      <Card ref={scrollRef} className="h-full w-full sm:max-w-sm overflow-scroll">
        {/*// @ts-ignore*/}
        <CardBody className="max-w-sm max-h-[72vh] h-full py-2 px-0">
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
              {filteredWorkouts?.map((workout, index) => {
                const isLast = index === workouts.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 pr-0 border-b border-gray-300";

                return (
                  <tr key={workout.id}>
                    <td className="pl-1">
                      <div className="flex items-center justify-center">
                        {/* //@ts-ignore */}
                        <Menu>
                          <MenuHandler className="border border-1 border-gray-700 rounded-full">
                            <EllipsisVertical size={30}/>
                          </MenuHandler>
                          {/*//@ts-ignore */}
                          <MenuList>
                            {/* @ts-ignore */}
                            <MenuItem
                            onClick={() => navigate(`/workout/${workout.id}`)}
                            >  
                              Editar
                            </MenuItem>
                            {/* @ts-ignore */}
                            <MenuItem
                            onClick={() => DeleteWorkout(workout.id)}
                            >  
                              Eliminar
                            </MenuItem>
                            {/* @ts-ignore */}
                            <MenuItem
                            onClick={() => alert("Funcionalidad en desarrollo") }
                            >  
                              Asignar a Cliente
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </td>
                    <td className={`${classes}`}>
                      <div className="flex items-center gap-1">
                        {/*// @ts-ignore*/}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold line-clamp-2 w-[130px]"
                        >
                          {workout.nombre}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      {/*// @ts-ignore*/}
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600 line-clamp-3 w-[140px]"
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
