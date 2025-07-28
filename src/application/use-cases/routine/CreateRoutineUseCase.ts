import { IRoutineRepository } from '@domain/repositories/IRoutineRepository';

export class CreateRoutineUseCase {
  constructor(private routineRepository: IRoutineRepository) {
    this.routineRepository = routineRepository;
  }
  async execute(name: string, weeks: number, days: number, user_id: number) {
    return await this.routineRepository.createRoutine(
      name,
      weeks,
      days,
      user_id,
    );
  }
}
