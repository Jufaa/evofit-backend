import { MainMuscle } from '@domain/entities/MainMuscle';
import { IMainMuscleRepository } from '@domain/repositories/IMainMuscleRepository';

export class getMainMuscleByIdUseCase {
  constructor(private mainMuscleRepository: IMainMuscleRepository) {
    this.mainMuscleRepository = mainMuscleRepository;
  }

  async execute(main_muscle_id: number): Promise<MainMuscle> {
    return await this.mainMuscleRepository.getMainMuscleById(main_muscle_id);
  }
}
