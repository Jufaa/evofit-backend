import { RoutineExercise } from 'domain/entities';
import { RoutineExercisesSchema } from 'infrastructure/schemas/RoutinesExercises-schema';

/* eslint-disable no-unused-vars */
export interface IRoutineExerciseRepository {
  getRoutineExerciseById(
    routineExerciseId: number,
  ): Promise<RoutineExercise | null>;
  addRoutineExercise(
    routine_id: number,
    exercise_id: number,
    sets: number,
    reps: number,
    weight: number,
  ): Promise<RoutineExercise>;
  deleteExerciseInRoutine(routine_id: number, exercise_id: number): Promise<boolean>;
  editRoutineExercise(
    routine_id: number,
    exercise_id: number,
    updatedData: Partial<RoutineExercisesSchema>,
  ): Promise<RoutineExercise | null>;
  getAllRoutineExercises(): Promise<RoutineExercise[]>;
  existsRoutineExercise(id: number): Promise<boolean>;
}
