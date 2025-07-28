import { Request, Response } from 'express';
import { GetAllExerciseUseCase } from '@application/use-cases/exercises/GetAllExerciseUseCase';
import { GetExerciseByMainMuscleIdUseCase } from '@application/use-cases/exercises/GetExerciseByMainMuscleIdUseCase';

export class ExerciseController {
  constructor(
    private getAllExerciseUseCase: GetAllExerciseUseCase,
    private getExerciseByMainMuscleIdUseCase: GetExerciseByMainMuscleIdUseCase,
  ) {
    this.getAllExerciseUseCase = getAllExerciseUseCase;
    this.getExerciseByMainMuscleIdUseCase = getExerciseByMainMuscleIdUseCase;
  }

  async getAllExercises(_req: Request, res: Response) {
    try {
      const exercises = await this.getAllExerciseUseCase.execute();
      return res.json(exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async getExerciseByMainMuscleId(req: Request, res: Response) {
    try {
      const { main_muscle_id } = req.params;
      const exercises = await this.getExerciseByMainMuscleIdUseCase.execute(
        Number(main_muscle_id),
      );
      return res.json(exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
