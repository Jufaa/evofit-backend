import { RoutineExercise } from '@domain/entities';
import { IRoutineExerciseRepository } from '@domain/repositories/IRoutineExerciseRepository';

export class AddRoutineExerciseUseCase {
  constructor(private routineExerciseRepository: IRoutineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }
  async execute(
    routine_id: number,
    exercise_id: number,
    sets: number,
    reps: number,
    weight: number,
  ): Promise<RoutineExercise> {
    return await this.routineExerciseRepository.addRoutineExercise(
      routine_id,
      exercise_id,
      sets,
      reps,
      weight,
    );
  }
}
