import { Chip } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LibraryActivity(){
  const [clickExercise, setClickExercise] = useState(false);
  const [clickWorkout, setClickWorkout] = useState(false);
  const navigate = useNavigate();
  const currentRoute = useLocation();

  useEffect(() => {
    if (currentRoute.pathname === "/admin/libreria/activity/exercises") {
      setClickExercise(true);
      setClickWorkout(false);
    } else if (currentRoute.pathname === "/admin/libreria/activity/workouts") {
      setClickWorkout(true);
      setClickExercise(false);
    }
  }, [currentRoute]);

    const handleClickExercise = () => {
        setClickExercise(true);
        setClickWorkout(false);
        navigate("/admin/libreria/activity/exercises");
      };
    
      const handleClickWorkout = () => {
        setClickWorkout(true);
        setClickExercise(false);
        navigate("/admin/libreria/activity/workouts");
      };

    return (
        <div className="fixed top-11 left-0 w-full px-4 z-40">
        <div className="mx-auto bg-white shadow rounded-2xl h-8 w-full max-w-xs flex items-center justify-around">
          <div onClick={handleClickExercise}>
            <Chip
              size="sm"
              value="Ejercicios"
              variant={clickExercise ? "filled" : "ghost"}
              color={clickExercise ? "blue" : "gray"}
              className="rounded-full"             
            />
          </div>
          <div onClick={handleClickWorkout}>
            <Chip
              size="sm"
              value="WorkOuts"
              variant={clickWorkout ? "filled" : "ghost"}
              color={clickWorkout ? "blue" : "gray"}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    );
}