import { Router, Request, Response, NextFunction } from 'express';
import { SubMuscleController } from '@presentation/controllers/SubMuscleController';
import { GetSubMusclesByMuscleMainUseCase } from '@application/use-cases/submuscles/GetSubMusclesByMuscleMainUseCase';
import { SequalizeSubMuscleRepository } from '@infrastructure/database/SequalizeSubMuscleRepository';

const router = Router();

const subMuscleRepository = new SequalizeSubMuscleRepository();

const subMuscleController = new SubMuscleController(
  new GetSubMusclesByMuscleMainUseCase(subMuscleRepository),
);

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
/**
 * @swagger
 * /submuscles/{main_muscle_id}:
 *   get:
 *     summary: Obtener submúsculos por músculo principal
 *     tags: [SubMuscles]
 *     parameters:
 *       - in: path
 *         name: main_muscle_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de submúsculos
 *       404:
 *         description: No se encontraron submúsculos
 */

router.get(
  '/:main_muscle_id',
  asyncHandler(async (req: Request, res: Response) => {
    await subMuscleController.getSubMusclesByMuscleMain(req, res);
  }),
);

export default router;
