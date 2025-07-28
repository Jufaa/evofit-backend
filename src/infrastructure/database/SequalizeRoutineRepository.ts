import { Routine } from '@domain/entities';
import { IRoutineRepository } from 'domain/repositories/IRoutineRepository';
import { RoutinesSchema } from 'infrastructure/schemas/Routines-schema';

export class SequalizeRoutineRepository implements IRoutineRepository {
  private toDomain(routine: RoutinesSchema): Routine {
    return new Routine(
      routine.name,
      routine.weeks,
      routine.days,
      routine.user_id,
    );
  }

  async createRoutine(
    name: string,
    weeks: number,
    days: number,
    user_id: number,
  ): Promise<Routine> {
    if (!name || !weeks || !days || !user_id) {
      throw new Error(
        'profileId, name and exercises are required to create a routine',
      );
    }

    const routineCreated = await RoutinesSchema.create({
      name,
      weeks,
      days,
      user_id,
    });
    return this.toDomain(routineCreated);
  }
  async getAllRoutinesByUserId(userId: number): Promise<Routine[]> {
    const routines = await RoutinesSchema.findAll({
      where: { user_id: userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['name_routine', 'ASC']],
    });
    return routines.map((routine) => this.toDomain(routine));
  }

  async editRoutineById(routine_id: number, updateDate: {
    name?: string,
    weeks?: number,
    days?: number,
  }){
    await RoutinesSchema.update(updateDate, {
      where: {routine_id}
    })
    const updated = await RoutinesSchema.findOne({
      where: { routine_id },
    })
    if(!updated) throw new Error('Routine not found');
    return this.toDomain(updated);
  }
  async getRoutineById(routineId: number): Promise<Routine | null> {
    const routine = await RoutinesSchema.findByPk(routineId);
    if (!routine) return null;
    return this.toDomain(routine);
  }
  async delRoutine(routineId: number) {
    const deletedRows = await RoutinesSchema.destroy({
      where: { routine_id: routineId },
    });
    if (deletedRows === 0) throw new Error('Exercise not found');
    if (deletedRows > 1) throw new Error('Routine deleted more than once');
    return true;
  }
}
