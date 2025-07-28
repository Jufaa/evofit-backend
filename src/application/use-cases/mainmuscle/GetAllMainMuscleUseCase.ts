import { MainMuscle } from '@domain/entities/MainMuscle';
import { IMainMuscleRepository } from '@domain/repositories/IMainMuscleRepository';

export class GetAllMainMuscleUseCase {
  constructor(private mainMuscleRepository: IMainMuscleRepository) {
    this.mainMuscleRepository = mainMuscleRepository;
  }

  async execute(): Promise<MainMuscle[]> {
    return await this.mainMuscleRepository.getAllMainMuscle();
  }
}
