import { Workout } from "./workout";
import { WorkoutElementDetail } from "./WorkoutElementDetail";

export interface FullWorkoutResponse {
  workout: Workout;
  elementos: WorkoutElementDetail[];
}
