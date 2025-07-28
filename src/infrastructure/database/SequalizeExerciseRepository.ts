import { Exercise } from 'domain/entities';
import { IExerciseRepository } from '../../domain/repositories/IExerciseRepository';
import { ExercisesSchema } from '../schemas/Exercises-schema';

export class SequalizeExerciseRepository implements IExerciseRepository {
  async getAllExercises(): Promise<Exercise[]> {
    return await ExercisesSchema.findAll();
  }
  async getExerciseByMainMuscleId(main_muscle_id: number): Promise<Exercise[]> {
    if (!main_muscle_id) throw new Error('Main Muscle ID is required');
    const exercises = await ExercisesSchema.findAll({
      where: { main_muscle_id },
    });
    if (!exercises) throw new Error('Exercises not found');
    return exercises;
  }
}
