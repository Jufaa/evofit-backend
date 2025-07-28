import { IRoutineRepository } from '@domain/repositories/IRoutineRepository';

export class DelRoutineUseCase {
  constructor(private routineRepository: IRoutineRepository) {
    this.routineRepository = routineRepository;
  }
  async execute(routineId: number): Promise<boolean> {
    return await this.routineRepository.delRoutine(routineId);
  }
}
