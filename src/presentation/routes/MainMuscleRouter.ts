import { Router, Request, Response, NextFunction } from 'express';
import { SequalizeMainMuscleRepository } from '@infrastructure/database/SequalizeMainMuscleRepository';
import { MainMuscleController } from '@presentation/controllers/MainMuscleController';
import { GetAllMainMuscleUseCase } from '@application/use-cases/mainmuscle/GetAllMainMuscleUseCase';
import { getMainMuscleByIdUseCase } from '@application/use-cases/mainmuscle/GetMainMuscleByIdUseCase';

const router = Router();

const mainMuscleRepository = new SequalizeMainMuscleRepository();

const mainMuscleController = new MainMuscleController(
  new GetAllMainMuscleUseCase(mainMuscleRepository),
  new getMainMuscleByIdUseCase(mainMuscleRepository),
);

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

/**
 * @swagger
 * /mainmuscles/all:
 *   get:
 *     summary: Obtener todos los músculos principales
 *     tags: [MainMuscles]
 *     responses:
 *       200:
 *         description: Lista de músculos principales
 */

router.get(
  '/all',
  asyncHandler(async (req: Request, res: Response) => {
    await mainMuscleController.getAllMainMuscle(req, res);
  }),
);

/**
 * @swagger
 * /mainmuscles/{mainMuscleId}:
 *   get:
 *     summary: Obtener músculo principal por ID
 *     tags: [MainMuscles]
 *     parameters:
 *       - in: path
 *         name: mainMuscleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Músculo encontrado
 *       404:
 *         description: No se encontró el músculo
 */

router.get(
  '/:mainMuscleId',
  asyncHandler(async (req: Request, res: Response) => {
    await mainMuscleController.getMainMuscleById(req, res);
  }),
);

export default router;
