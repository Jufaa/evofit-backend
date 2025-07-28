import { MainMuscleSchema } from '@infrastructure/schemas/MainMuscle-schema';
import { IMainMuscleRepository } from '../../domain/repositories/IMainMuscleRepository';
import { MainMuscle } from '@domain/entities/MainMuscle';

export class SequalizeMainMuscleRepository implements IMainMuscleRepository {
  async getAllMainMuscle(): Promise<MainMuscle[]> {
    return await MainMuscleSchema.findAll();
  }

  async getMainMuscleById(mainMuscleId: number): Promise<MainMuscle> {
    if (!mainMuscleId) throw new Error('Main Muscle ID is required');
    const mainMuscle = await MainMuscleSchema.findByPk(mainMuscleId);
    if (!mainMuscle) throw new Error('Main Muscle not found');
    return mainMuscle;
  }
}
