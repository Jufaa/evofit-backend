import { IRoutineRepository } from '@domain/repositories/IRoutineRepository';

export class GetAllRoutinesByUserIdUseCase {
  constructor(private routineRepository: IRoutineRepository) {
    this.routineRepository = routineRepository;
  }
  async execute(userId: number): Promise<any> {
    return await this.routineRepository.getAllRoutinesByUserId(userId);
  }
}
