import { Routine } from '@domain/entities';

/* eslint-disable no-unused-vars */
export interface IRoutineRepository {
  createRoutine(
    name: string,
    weeks: number,
    days: number,
    user_id: number,
  ): Promise<Routine>;
  getAllRoutinesByUserId(userId: number): Promise<Routine[]>;
  getRoutineById(routineId: number): Promise<Routine | null>;
  delRoutine(routineId: number): Promise<boolean>;
  editRoutineById(
    routine_id: number,
    updateData: {
      name?: string;
      weeks?: number;
      days?: number;
    },
  ): Promise<Routine | null>;
}
