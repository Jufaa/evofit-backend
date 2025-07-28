/* eslint-disable no-unused-vars */

import { User } from '../entities';

export interface IUserRepository {
  isUniqueUser(username: string, email: string): Promise<boolean>;
  addUser(user: User): Promise<User>;
  checkUserExists(username: string): Promise<boolean>;
  getUserById(userId: number): Promise<User | null>;
  getLoginUser(username: string, password: string): Promise<User>;
}
