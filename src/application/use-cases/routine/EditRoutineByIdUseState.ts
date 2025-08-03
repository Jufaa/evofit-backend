import { IRoutineRepository } from '@domain/repositories/IRoutineRepository';
import { RoutinesSchema } from '@infrastructure/schemas/Routines-schema';

export class EditRoutineByIdUseState {
  constructor(private routineRepository: IRoutineRepository) {
    this.routineRepository = routineRepository;
  }

  async execute(
    routine_id: number,
    updateData: Partial<RoutinesSchema>,
  ): Promise<RoutinesSchema | null> {
    const routine = await this.routineRepository.editRoutineById(
      routine_id,
      updateData,
    );
    if (!routine) return null;
    // Assuming you have a function to convert Routine to RoutinesSchema
    return routine as unknown as RoutinesSchema;
  }
}
