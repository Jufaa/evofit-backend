import { ExercisesSchema } from '@infrastructure/schemas/Exercises-schema';
import { RoutineExercise } from 'domain/entities';
import { IRoutineExerciseRepository } from 'domain/repositories/IRoutineExerciseRepository';
import { RoutineExercisesSchema } from 'infrastructure/schemas/RoutinesExercises-schema';

export class SequalizeRoutineExerciseRepository
  implements IRoutineExerciseRepository
{
  async getRoutineExerciseById(routineExerciseId: number) {
    if (!routineExerciseId) throw new Error('Routine Exercise ID is required');
    const routineExercise =
      await RoutineExercisesSchema.findByPk(routineExerciseId);
    if (!routineExercise) throw new Error('Routine Exercise not found');
    const routineExerciseEntity = this.toDomain(routineExercise);
    return routineExerciseEntity;
  }

  async addRoutineExercise(
    routine_id: number,
    exercise_id: number,
    sets: number,
    reps: number,
    weight: number,
  ) {
    console.log(routine_id, exercise_id, sets, reps, weight);
    const existingExercise = await ExercisesSchema.findOne({
      where: { exercise_id },
    });
    if (!existingExercise) {
      throw new Error('Exercise not found');
    }

    const newRoutineExercise = await RoutineExercisesSchema.create({
      routine_id,
      exercise_id,
      sets,
      reps,
      weight,
    });

    return this.toDomain(newRoutineExercise);
  }

  async editRoutineExercise(
    routine_id: number,
    exercise_id: number,
    updatedData: {
      sets?: number;
      reps?: number;
      weight?: number;
    },
  ) {
    await RoutineExercisesSchema.update(updatedData, {
      where: { routine_id, exercise_id },
    });

    const updated = await RoutineExercisesSchema.findOne({
      where: { routine_id, exercise_id },
    });

    if (!updated) {
      throw new Error('Routine Exercise not found');
    }

    return this.toDomain(updated);
  }

  async deleteExerciseInRoutine(routine_id: number, exercise_id: number) {
    const deletedRows = await RoutineExercisesSchema.destroy({
      where: { routine_id, exercise_id },
    });
    if (deletedRows === 0) {
      throw new Error('Exercise not found in the routine');
    }
    return true;
  }

  async getAllRoutineExercises() {
    const routineExercises = await RoutineExercisesSchema.findAll();
    return routineExercises.map(this.toDomain);
  }

  async existsRoutineExercise(id: number) {
    const count = await RoutineExercisesSchema.count({
      where: { routine_exercise_id: id },
    });
    return count > 0;
  }
  private toDomain(routineExercise: RoutineExercisesSchema): RoutineExercise {
    return new RoutineExercise(
      routineExercise.routine_id,
      routineExercise.exercise_id,
      routineExercise.sets,
      routineExercise.reps,
      routineExercise.weight,
    );
  }
}
