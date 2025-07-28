import { Router, Request, Response, NextFunction } from 'express';
import { RoutineExerciseController } from 'presentation/controllers/RoutineExerciseController';
import { AddRoutineExerciseUseCase } from '@application/use-cases/routine-exercise/AddRoutineExerciseUseCase';
import { DeleteExerciseInRoutineUseCase } from '@application/use-cases/routine-exercise/DeleteExerciseInRoutineUseCase';
import { EditRoutineExerciseUseCase } from '@application/use-cases/routine-exercise/EditRoutineExerciseUseCase';
import { ExistsRoutineExerciseUseCase } from '@application/use-cases/routine-exercise/ExistsRoutineExerciseUseCase';
import { GetAllRoutineExercisesUseCase } from '@application/use-cases/routine-exercise/GetAllRoutineExercisesUseCase';
import { GetRoutineExerciseByIdUseCase } from '@application/use-cases/routine-exercise/GetRoutineExerciseByIdUseCase';
import { SequalizeRoutineExerciseRepository } from '@infrastructure/database/SequealizeRoutineExerciseRepository';

const router = Router();

// Inyección de dependencias
const routineExerciseRepository = new SequalizeRoutineExerciseRepository();

const routineExerciseController = new RoutineExerciseController(
  new AddRoutineExerciseUseCase(routineExerciseRepository),
  new DeleteExerciseInRoutineUseCase(routineExerciseRepository),
  new EditRoutineExerciseUseCase(routineExerciseRepository),
  new ExistsRoutineExerciseUseCase(routineExerciseRepository),
  new GetAllRoutineExercisesUseCase(routineExerciseRepository),
  new GetRoutineExerciseByIdUseCase(routineExerciseRepository),
);

// Middleware para manejar errores en rutas asíncronas
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Rutas

/**
 * @swagger
 * /routine-exercise/add:
 *   post:
 *     summary: Agregar un ejercicio a una rutina
 *     tags: [RoutineExercise]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - routine_id
 *               - exercise_id
 *               - sets
 *               - reps
 *               - weight
 *             properties:
 *               routine_id:
 *                 type: integer
 *               exercise_id:
 *                 type: integer
 *               sets:
 *                 type: integer
 *               reps:
 *                 type: integer
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ejercicio agregado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se pudo agregar el ejercicio
 */

router.post(
  '/add',
  asyncHandler(
    routineExerciseController.addRoutineExercise.bind(
      routineExerciseController,
    ),
  ),
);
/**
 * @swagger
 * /routine-exercise/edit-routineExercise/{routineId}/{exerciseId}:
 *   put:
 *     summary: Editar un ejercicio dentro de una rutina
 *     tags: [RoutineExercise]
 *     parameters:
 *       - in: path
 *         name: routineId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: exerciseId
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
 *               sets:
 *                 type: integer
 *               reps:
 *                 type: integer
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ejercicio actualizado correctamente
 *       404:
 *         description: No se encontró el ejercicio en la rutina
 */

router.put(
  '/edit-routineExercise/:routineId/:exerciseId',
  asyncHandler(
    routineExerciseController.editRoutineExercise.bind(
      routineExerciseController,
    ),
  ),
);
/**
 * @swagger
 * /routine-exercise/delete/{routineId}/{exerciseId}:
 *   delete:
 *     summary: Eliminar un ejercicio de una rutina
 *     tags: [RoutineExercise]
 *     parameters:
 *       - in: path
 *         name: routineId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ejercicio eliminado correctamente
 *       404:
 *         description: No se encontró el ejercicio en la rutina
 */

router.delete(
  '/delete/:routineId/:exerciseId',
  asyncHandler(
    routineExerciseController.deleteExerciseInRoutine.bind(
      routineExerciseController,
    ),
  ),
);
/**
 * @swagger
 * /routine-exercise/:
 *   get:
 *     summary: Obtener todos los ejercicios de todas las rutinas
 *     tags: [RoutineExercise]
 *     responses:
 *       200:
 *         description: Lista de todos los ejercicios en rutinas
 *       404:
 *         description: No se encontraron ejercicios
 */

router.get(
  '/',
  asyncHandler(
    routineExerciseController.getAllRoutineExercises.bind(
      routineExerciseController,
    ),
  ),
);
/**
 * @swagger
 * /routine-exercise/{id}/exists:
 *   get:
 *     summary: Verificar si un ejercicio en rutina existe por ID
 *     tags: [RoutineExercise]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultado de existencia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       404:
 *         description: Error al verificar existencia
 */

router.get(
  '/:id/exists',
  asyncHandler(
    routineExerciseController.existsRoutineExercise.bind(
      routineExerciseController,
    ),
  ),
);

export default router;
