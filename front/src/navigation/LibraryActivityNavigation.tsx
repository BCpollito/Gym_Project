import { Chip } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LibraryActivity(){
  const [clickExercise, setClickExercise] = useState(true);
  const [clickWorkout, setClickWorkout] = useState(false);
  const navigate = useNavigate();

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
        <div className="fixed top-[70px] left-0 w-full px-4">
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