import { IRoutineExerciseRepository } from '@domain/repositories/IRoutineExerciseRepository';

export class GetAllRoutineExercisesUseCase {
  constructor(private routineExerciseRepository: IRoutineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }
  async execute() {
    return await this.routineExerciseRepository.getAllRoutineExercises();
  }
}
