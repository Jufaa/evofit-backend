import { Router, Request, Response, NextFunction } from 'express';
import { SequalizeUserRepository } from 'infrastructure/database/SequealizeUserRepository';
import { UserController } from 'presentation/controllers/UserController';
import { AddUserUseCase } from '@application/use-cases/users/AddUserUseCase';
import { CheckUserExistsUseCase } from '@application/use-cases/users/CheckUserExistsUseCase';
import { GetLoginUserUseCase } from '@application/use-cases/users/GetLoginUserUseCase';
import { GetUserByIdUseCase } from '@application/use-cases/users/GetUserByIdUseCase';
import { IsUniqueUserUseCase } from '@application/use-cases/users/IsUniqueUserUseCase';

const router = Router();

// Inyección de dependencias
const userRepository = new SequalizeUserRepository();

const userController = new UserController(
  new AddUserUseCase(userRepository),
  new CheckUserExistsUseCase(userRepository),
  new GetLoginUserUseCase(userRepository),
  new GetUserByIdUseCase(userRepository),
  new IsUniqueUserUseCase(userRepository),
);

// Middleware para manejar errores en rutas asíncronas
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en la validación
 */
  
router.post(
  '/register',
  asyncHandler(userController.createUser.bind(userController)),
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */

router.post(
  '/login',
  asyncHandler(userController.loginUser.bind(userController)),
);

/**
 * @swagger
 * /auth/{userId}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 */

router.get(
  '/:userId',
  asyncHandler(userController.getUserById.bind(userController)),
);

export default router;
