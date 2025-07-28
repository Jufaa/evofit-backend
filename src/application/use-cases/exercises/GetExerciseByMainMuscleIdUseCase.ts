import { Exercise } from '@domain/entities';
import { IExerciseRepository } from '@domain/repositories/IExerciseRepository';

export class GetExerciseByMainMuscleIdUseCase {
  constructor(private exerciseRepository: IExerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  async execute(main_muscle_id: number): Promise<Exercise[]> {
    if (!main_muscle_id) throw new Error('Main Muscle ID is required');
    return await this.exerciseRepository.getExerciseByMainMuscleId(
      main_muscle_id,
    );
  }
}
