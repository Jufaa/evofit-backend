import { Router, Request, Response, NextFunction } from 'express';
import { SequalizeRoutineRepository } from 'infrastructure/database/SequalizeRoutineRepository';
import { RoutineController } from 'presentation/controllers/RoutineController';
import { CreateRoutineUseCase } from '@application/use-cases/routine/CreateRoutineUseCase';
import { DelRoutineUseCase } from '@application/use-cases/routine/DelRoutineUseCase';
import { GetAllRoutinesByUserIdUseCase } from '@application/use-cases/routine/GetAllRoutinesByUserIdUseCase';
import { GetRoutineByIdUseCase } from '@application/use-cases/routine/GetRoutineByIdUseCase';
import { EditRoutineByIdUseState } from '@application/use-cases/routine/EditRoutineByIdUseState';

const router = Router();

// Inyección de dependencias
const routineRepository = new SequalizeRoutineRepository();

const routineController = new RoutineController(
  new CreateRoutineUseCase(routineRepository),
  new DelRoutineUseCase(routineRepository),
  new GetAllRoutinesByUserIdUseCase(routineRepository),
  new GetRoutineByIdUseCase(routineRepository),
  new EditRoutineByIdUseState(routineRepository),
);

// Middleware para manejar errores en rutas asíncronas
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Definir rutas

/**
 * @swagger
 * /routines/{routineId}:
 *   get:
 *     summary: Obtener una rutina por ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: routineId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina encontrada
 *       404:
 *         description: Rutina no encontrada
 */

router.get(
  '/:routineId',
  asyncHandler(async (req: Request, res: Response) => {
    await routineController.getRoutineById(req, res);
  }),
);

/**
 * @swagger
 * /routines/create:
 *   post:
 *     summary: Crear una nueva rutina
 *     tags: [Routines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - weeks
 *               - days
 *               - user_id
 *             properties:
 *               name:
 *                 type: string
 *               weeks:
 *                 type: integer
 *               days:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rutina creada correctamente
 *       400:
 *         description: Faltan campos requeridos
 */

router.post(
  '/create',
  asyncHandler(async (req: Request, res: Response) => {
    await routineController.createRoutine(req, res);
  }),
);

/**
 * @swagger
 * /routines/all/{userId}:
 *   get:
 *     summary: Obtener todas las rutinas de un usuario
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de rutinas del usuario
 *       404:
 *         description: No se encontraron rutinas para el usuario
 */

router.get(
  '/all/:userId',
  asyncHandler(async (req: Request, res: Response) => {
    await routineController.getAllRoutinesByUserId(req, res);
  }),
);
/**
 * @swagger
 * /routines/delete/{routineId}:
 *   delete:
 *     summary: Eliminar una rutina por ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: routineId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rutina eliminada correctamente
 *       404:
 *         description: Rutina no encontrada
 */

router.delete(
  '/delete/:routineId',
  asyncHandler(async (req: Request, res: Response) => {
    await routineController.delRoutine(req, res);
  }),
);
/**
 * @swagger
 * /routines/edit/{routineId}:
 *   put:
 *     summary: Editar una rutina existente
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: routineId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weeks:
 *                 type: integer
 *               days:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rutina actualizada correctamente
 *       404:
 *         description: Rutina no encontrada
 */

router.put(
  '/edit/:routineId',
  asyncHandler(async (req: Request, res: Response) => {
    await routineController.editRoutineById(req, res);
  }),
);

export default router;
