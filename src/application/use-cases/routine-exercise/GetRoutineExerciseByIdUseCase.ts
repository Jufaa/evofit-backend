import { IRoutineExerciseRepository } from '@domain/repositories/IRoutineExerciseRepository';

export class GetRoutineExerciseByIdUseCase {
  constructor(private routineExerciseRepository: IRoutineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }
  async execute(routineExerciseId: number) {
    return await this.routineExerciseRepository.getRoutineExerciseById(
      routineExerciseId,
    );
  }
}
