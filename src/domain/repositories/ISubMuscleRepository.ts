/* eslint-disable no-unused-vars */

import { SubMuscle } from '@domain/entities/Submuscle';

export interface ISubMuscleRepository {
  getSubMusclesByMuscleMain(main_muscle_id: number): Promise<SubMuscle[]>;
}
