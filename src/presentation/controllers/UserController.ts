import { AddUserUseCase } from '@application/use-cases/users/AddUserUseCase';
import { CheckUserExistsUseCase } from '@application/use-cases/users/CheckUserExistsUseCase';
import { GetLoginUserUseCase } from '@application/use-cases/users/GetLoginUserUseCase';
import { GetUserByIdUseCase } from '@application/use-cases/users/GetUserByIdUseCase';
import { IsUniqueUserUseCase } from '@application/use-cases/users/IsUniqueUserUseCase';
import { User } from 'domain/entities';
import { Request, Response } from 'express';
export class UserController {
  constructor(
    private addUserUseCase: AddUserUseCase,
    private checkUserExistsUseCase: CheckUserExistsUseCase,
    private getLoginUserUseCase: GetLoginUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private isUniqueUserUseCase: IsUniqueUserUseCase,
  ) {
    this.addUserUseCase = addUserUseCase;
    this.checkUserExistsUseCase = checkUserExistsUseCase;
    this.getLoginUserUseCase = getLoginUserUseCase;
    this.getUserByIdUseCase = getUserByIdUseCase;
    this.isUniqueUserUseCase = isUniqueUserUseCase;
  }

  async createUser(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        firstName,
        lastName,
        role,
        birthdate,
      } = req.body;

      if (
        !username ||
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !role ||
        !birthdate
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const isUnique = await this.isUniqueUserUseCase.execute(username, email);
      if (!isUnique) {
        return res
          .status(400)
          .json({ message: 'Username or email already in use' });
      }

      const newUser: User = {
        username,
        email,
        password,
        firstName,
        lastName,
        role,
        birthdate,
        routines: [],
      };
      const createdUser = await this.addUserUseCase.execute(newUser);
      return res.status(200).json(createdUser);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const user = await this.getUserByIdUseCase.execute(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: 'Username and password are required' });
      }

      const user = await this.getLoginUserUseCase.execute(username, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
