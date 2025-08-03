import { IRoutineExerciseRepository } from '@domain/repositories/IRoutineExerciseRepository';

export class DeleteExerciseInRoutineUseCase {
  constructor(private routineExerciseRepository: IRoutineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }
  async execute(routine_id: number, exercise_id: number): Promise<boolean> {
    return await this.routineExerciseRepository.deleteExerciseInRoutine(
      routine_id,
      exercise_id,
    );
  }
}
