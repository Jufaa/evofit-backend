import { RoutineExercise } from '@domain/entities';
import { IRoutineExerciseRepository } from '@domain/repositories/IRoutineExerciseRepository';
import { RoutineExercisesSchema } from '@infrastructure/schemas/RoutinesExercises-schema';

export class EditRoutineExerciseUseCase {
  constructor(private routineExerciseRepository: IRoutineExerciseRepository) {
    this.routineExerciseRepository = routineExerciseRepository;
  }
  async execute(
    routineId: number,
    exerciseId: number,
    updateData: Partial<RoutineExercisesSchema>,
  ): Promise<RoutineExercise | null> {
    return await this.routineExerciseRepository.editRoutineExercise(
      routineId,
      exerciseId,
      updateData,
    );
  }
}
