import { Request, Response } from 'express';
import { GetAllMainMuscleUseCase } from '@application/use-cases/mainmuscle/GetAllMainMuscleUseCase';
import { getMainMuscleByIdUseCase } from '@application/use-cases/mainmuscle/GetMainMuscleByIdUseCase';

export class MainMuscleController {
  constructor(
    private getAllMainMuscleUseCase: GetAllMainMuscleUseCase,
    private getMainMuscleByIdUseCase: getMainMuscleByIdUseCase,
  ) {
    this.getAllMainMuscleUseCase = getAllMainMuscleUseCase;
    this.getMainMuscleByIdUseCase = getMainMuscleByIdUseCase;
  }

  async getAllMainMuscle(_req: Request, res: Response) {
    try {
      const mainMuscles = await this.getAllMainMuscleUseCase.execute();
      return res.json(mainMuscles);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async getMainMuscleById(req: Request, res: Response) {
    try {
      const { mainMuscleId } = req.params;
      const mainMuscle = await this.getMainMuscleByIdUseCase.execute(
        Number(mainMuscleId),
      );
      return res.json(mainMuscle);
    } catch (error) {
      console.error('Error fetching exercise by ID:', error);
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
