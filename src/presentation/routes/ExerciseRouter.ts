import { Router, Request, Response, NextFunction } from 'express';
import { ExerciseController } from '@presentation/controllers/ExerciseController';

// Importar los casos de uso
import { GetAllExerciseUseCase } from '@application/use-cases/exercises/GetAllExerciseUseCase';
import { SequalizeExerciseRepository } from '@infrastructure/database/SequalizeExerciseRepository';
import { GetExerciseByMainMuscleIdUseCase } from '@application/use-cases/exercises/GetExerciseByMainMuscleIdUseCase';

const router = Router();

// Inyectar el repositorio
const exerciseRepository = new SequalizeExerciseRepository();

// Inyectar los casos de uso
const exerciseController = new ExerciseController(
  new GetAllExerciseUseCase(exerciseRepository),
  new GetExerciseByMainMuscleIdUseCase(exerciseRepository),
);

// Middleware de manejo de errores
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

{
  /**
   * @swagger
   * /exercises/all:
   *   get:
   *     summary: Obtener todos los ejercicios
   *     tags: [Exercises]
   *     responses:
   *       200:
   *         description: Lista de ejercicios
   */

  router.get(
    '/all',
    asyncHandler(async (req: Request, res: Response) => {
      await exerciseController.getAllExercises(req, res);
    }),
  );

  /**
   * @swagger
   * /exercises/all/{main_muscle_id}:
   *   get:
   *     summary: Obtener ejercicios por músculo principal
   *     tags: [Exercises]
   *     parameters:
   *       - in: path
   *         name: main_muscle_id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de ejercicios
   *       404:
   *         description: No se encontraron ejercicios
   */

  router.get(
    '/all/:main_muscle_id',
    asyncHandler(async (req: Request, res: Response) => {
      await exerciseController.getExerciseByMainMuscleId(req, res);
    }),
  );

  //**router.get(
  //  '/:exerciseId',
  //  asyncHandler(async (req: Request, res: Response) => {
  //    await exerciseController.getExerciseById(req, res);
  //  }),
  //)//;

  //router.post(
  //  '/create',
  //  asyncHandler(async (req: Request, res: Response) => {
  //    await exerciseController.createExercise(req, res);
  //  }),
  //)//;

  //router.put(
  //  '/update/:exerciseId',
  //  asyncHandler(async (req: Request, res: Response) => {
  //    await exerciseController.updateExercise(req, res);
  //  }),
  //)//;

  //router.delete(
  //  '/delete/:exerciseId',
  //  asyncHandler(async (req: Request, res: Response) => {
  //    await exerciseController.deleteExercise(req, res);
  //  }),
  //);

  //router.get(
  //'/muscleGroup/:muscleGroup',
  //asyncHandler(async (req: Request, res: Response) => {
  //  await exerciseController.getExercisesByMuscleGroup(req, res);
  //}),
  // ));
}
export default router;
