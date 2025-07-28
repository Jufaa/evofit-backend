import { Request, Response } from 'express';
import { GetSubMusclesByMuscleMainUseCase } from '@application/use-cases/submuscles/GetSubMusclesByMuscleMainUseCase';

export class SubMuscleController {
  constructor(
    private getSubMusclesByMuscleMainUseCase: GetSubMusclesByMuscleMainUseCase,
  ) {
    this.getSubMusclesByMuscleMainUseCase = getSubMusclesByMuscleMainUseCase;
  }

  async getSubMusclesByMuscleMain(req: Request, res: Response) {
    try {
      const { main_muscle_id } = req.params;
      const parsedMuscleMainId = parseInt(main_muscle_id, 10);
      const subMuscles =
        await this.getSubMusclesByMuscleMainUseCase.execute(parsedMuscleMainId);
      return res.json(subMuscles);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
