import { IRoutineExerciseRepository } from '@domain/repositories/IRoutineExerciseRepository';

export class ExistsRoutineExerciseUseCase {
  constructor(private routineExerciseRepository: IRoutineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }
  async execute(routineExerciseId: number) {
    return await this.routineExerciseRepository.existsRoutineExercise(
      routineExerciseId,
    );
  }
}
