import { useEffect, useState } from 'react';
import axios from 'axios';

interface Exercise {
  exerciseId: string;
  name: string;
  imageUrl: string;
  bodyParts: string[];
  equipments: string[];
  exerciseType: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  keywords: string[];
}

export default function LibreriaExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://v2.exercisedb.dev/api/v1/exercises')
      .then((res) => {
        setExercises(Array.isArray(res.data.data) ? res.data.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Página de Librería Ejercicios</h1>
      {loading ? (
        <p>Cargando ejercicios...</p>
      ) : (
        <ul>
          {exercises.slice(0, 10).map((exercise) => (
            <li key={exercise.exerciseId}>
              <strong>{exercise.name}</strong> - {exercise.bodyParts.join(', ')}
              <br />
              <img src={exercise.imageUrl} alt={exercise.name} width={100} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}