import { SubMuscle } from '@domain/entities/Submuscle';
import { ISubMuscleRepository } from '../../domain/repositories/ISubMuscleRepository';
import { SubMuscleSchema } from '../schemas/SubMuscle-schema';

export class SequalizeSubMuscleRepository implements ISubMuscleRepository {
  async getSubMusclesByMuscleMain(
    main_muscle_id: number,
  ): Promise<SubMuscle[]> {
    console.log('Fetching submuscles for main_muscle_id:', main_muscle_id);

    if (!main_muscle_id || isNaN(main_muscle_id)) {
      throw new Error('Invalid main muscle ID');
    }

    const subMuscles = await SubMuscleSchema.findAll({
      where: { main_muscle_id },
    });

    console.log('Submuscles found:', subMuscles);
    return subMuscles;
  }
}
