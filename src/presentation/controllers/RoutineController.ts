import { CreateRoutineUseCase } from '@application/use-cases/routine/CreateRoutineUseCase';
import { DelRoutineUseCase } from '@application/use-cases/routine/DelRoutineUseCase';
import { EditRoutineByIdUseState } from '@application/use-cases/routine/EditRoutineByIdUseState';
import { GetAllRoutinesByUserIdUseCase } from '@application/use-cases/routine/GetAllRoutinesByUserIdUseCase';
import { GetRoutineByIdUseCase } from '@application/use-cases/routine/GetRoutineByIdUseCase';
import { RoutinesSchema } from '@infrastructure/schemas/Routines-schema';
import { Request, Response } from 'express';

export class RoutineController {
  constructor(
    private createRoutineUseCase: CreateRoutineUseCase,
    private delRoutineUseCase: DelRoutineUseCase,
    private getAllRoutinesByUserIdUseCase: GetAllRoutinesByUserIdUseCase,
    private getRoutineByIdUseCase: GetRoutineByIdUseCase,
    private editRoutineByIdUseCase: EditRoutineByIdUseState,
  ) {
    this.createRoutineUseCase = createRoutineUseCase;
    this.delRoutineUseCase = delRoutineUseCase;
    this.getAllRoutinesByUserIdUseCase = getAllRoutinesByUserIdUseCase;
    this.getRoutineByIdUseCase = getRoutineByIdUseCase;
    this.editRoutineByIdUseCase = editRoutineByIdUseCase;
  }

  async createRoutine(req: Request, res: Response) {
    const { name, weeks, days, user_id } = req.body;
    if (!name || !weeks || !days || !user_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newRoutine = await this.createRoutineUseCase.execute(
      name,
      weeks,
      days,
      user_id,
    );
    res.status(200).json(newRoutine);
  }
  async getAllRoutinesByUserId(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const routines = await this.getAllRoutinesByUserIdUseCase.execute(userId);
    res.status(200).json(routines);
  }

  async getRoutineById(req: Request, res: Response) {
    const routineId = Number(req.params.routineId);
    const routine = await this.getRoutineByIdUseCase.execute(routineId);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(routine);
  }

  async delRoutine(req: Request, res: Response) {
    const routineId = Number(req.params.routineId);
    try {
      await this.delRoutineUseCase.execute(routineId);
      res.status(200).json({ message: 'Routine deleted successfully' });
    } catch {
      return res.status(404).json({ message: 'Routine not found' });
    }
  }

  async editRoutineById(req: Request, res: Response) {
    const routineId = Number(req.params.routineId);
    const updateData: Partial<RoutinesSchema> = req.body;
    const updatedRoutine = await this.editRoutineByIdUseCase.execute(
      routineId,
      updateData,
    );
    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(updatedRoutine);
  }
}
