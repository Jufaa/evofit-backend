import { IRoutineRepository } from '@domain/repositories/IRoutineRepository';

export class GetRoutineByIdUseCase {
  constructor(private routineRepository: IRoutineRepository) {
    this.routineRepository = routineRepository;
  }
  async execute(routineId: number): Promise<any> {
    return await this.routineRepository.getRoutineById(routineId);
  }
}
