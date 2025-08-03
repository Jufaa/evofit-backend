import { AddRoutineExerciseUseCase } from '@application/use-cases/routine-exercise/AddRoutineExerciseUseCase';
import { DeleteExerciseInRoutineUseCase } from '@application/use-cases/routine-exercise/DeleteExerciseInRoutineUseCase';
import { EditRoutineExerciseUseCase } from '@application/use-cases/routine-exercise/EditRoutineExerciseUseCase';
import { ExistsRoutineExerciseUseCase } from '@application/use-cases/routine-exercise/ExistsRoutineExerciseUseCase';
import { GetAllRoutineExercisesUseCase } from '@application/use-cases/routine-exercise/GetAllRoutineExercisesUseCase';
import { GetRoutineExerciseByIdUseCase } from '@application/use-cases/routine-exercise/GetRoutineExerciseByIdUseCase';
import { RoutineExercisesSchema } from '@infrastructure/schemas/RoutinesExercises-schema';
import { Request, Response } from 'express';
export class RoutineExerciseController {
  constructor(
    private addRoutineExerciseUseCase: AddRoutineExerciseUseCase,
    private deleteExerciseInRoutineUseCase: DeleteExerciseInRoutineUseCase,
    private editRoutineExerciseUseCase: EditRoutineExerciseUseCase,
    private existsRoutineExerciseUseCase: ExistsRoutineExerciseUseCase,
    private getAllRoutineExercisesUseCase: GetAllRoutineExercisesUseCase,
    private getRoutineExerciseByIdUseCase: GetRoutineExerciseByIdUseCase,
  ) {
    this.addRoutineExerciseUseCase = addRoutineExerciseUseCase;
    this.deleteExerciseInRoutineUseCase = deleteExerciseInRoutineUseCase;
    this.editRoutineExerciseUseCase = editRoutineExerciseUseCase;
    this.existsRoutineExerciseUseCase = existsRoutineExerciseUseCase;
    this.getAllRoutineExercisesUseCase = getAllRoutineExercisesUseCase;
    this.getRoutineExerciseByIdUseCase = getRoutineExerciseByIdUseCase;
  }
  async addRoutineExercise(req: Request, res: Response) {
    try {
      const { routine_id, exercise_id, sets, reps, weight } = req.body;
      console.log(routine_id, exercise_id, sets, reps, weight);
      const newRoutineExercise = await this.addRoutineExerciseUseCase.execute(
        routine_id,
        exercise_id,
        sets,
        reps,
        weight,
      );
      if (!newRoutineExercise) {
        return res.status(400).json({ message: 'Invalid data provided' });
      }

      return res.status(200).json(newRoutineExercise);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async editRoutineExercise(req: Request, res: Response) {
    try {
      const routineId = Number(req.params.routineId);
      const exerciseId = Number(req.params.exerciseId);
      const updatedData: Partial<RoutineExercisesSchema> = req.body;
      const updatedExercise = await this.editRoutineExerciseUseCase.execute(
        routineId,
        exerciseId,
        updatedData,
      );
      return res.status(200).json(updatedExercise);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // TODO: Deberia ser elminar un ejercicio de rutina exercise por id
  async deleteExerciseInRoutine(req: Request, res: Response) {
    try {
      const routine_id = Number(req.params.routineId);
      const exercise_id = Number(req.params.exerciseId);
      await this.deleteExerciseInRoutineUseCase.execute(
        routine_id,
        exercise_id,
      );

      return res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async getAllRoutineExercises(_req: Request, res: Response) {
    try {
      const exercises = await this.getAllRoutineExercisesUseCase.execute();
      return res.status(200).json(exercises);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async existsRoutineExercise(req: Request, res: Response) {
    try {
      const routineExerciseId = Number(req.params.id);
      const exists =
        await this.existsRoutineExerciseUseCase.execute(routineExerciseId);
      return res.status(200).json({ exists });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
