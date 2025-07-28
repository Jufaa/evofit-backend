import { Exercise } from 'domain/entities';

export interface IExerciseRepository {
  getAllExercises(): Promise<Exercise[]>;
  // eslint-disable-next-line no-unused-vars
  getExerciseByMainMuscleId(main_muscle_id: number): Promise<Exercise[]>;
}
