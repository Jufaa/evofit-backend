import { Exercise } from '../../../domain/entities/Exercises';
import { IExerciseRepository } from '../../../domain/repositories/IExerciseRepository';

export class GetAllExerciseUseCase {
  constructor(private exerciseRepository: IExerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  async execute(): Promise<Exercise[]> {
    return await this.exerciseRepository.getAllExercises();
  }
}
