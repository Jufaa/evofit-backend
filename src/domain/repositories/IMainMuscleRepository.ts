/* eslint-disable no-unused-vars */

import { MainMuscle } from '@domain/entities/MainMuscle';

export interface IMainMuscleRepository {
  getAllMainMuscle(): Promise<MainMuscle[]>;
  getMainMuscleById(mainMuscleId: number): Promise<MainMuscle>;
}
