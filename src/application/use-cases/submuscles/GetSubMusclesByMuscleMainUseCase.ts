import { SubMuscle } from '@domain/entities/Submuscle';
import { ISubMuscleRepository } from '@domain/repositories/ISubMuscleRepository';

export class GetSubMusclesByMuscleMainUseCase {
  constructor(private subMuscleRepository: ISubMuscleRepository) {
    this.subMuscleRepository = subMuscleRepository;
  }

  async execute(main_muscle_id: number): Promise<SubMuscle[]> {
    return await this.subMuscleRepository.getSubMusclesByMuscleMain(
      main_muscle_id,
    );
  }
}
