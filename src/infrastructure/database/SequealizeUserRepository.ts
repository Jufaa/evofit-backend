import { UsersSchema } from 'infrastructure/schemas/User-schemas';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Op } from 'sequelize';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcryptjs';
import { userSchemaToDomain } from './utils';

export class SequalizeUserRepository implements IUserRepository {
  async checkUserExists(username: string): Promise<boolean> {
    if (!username) throw new Error('Username is required');

    const count = await UsersSchema.count({ where: { username } });
    return count > 0;
  }
  async getLoginUser(username: string, password: string): Promise<User> {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const user = await UsersSchema.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    return this.toDomain(user);
  }

  async isUniqueUser(username: string, email: string): Promise<boolean> {
    const user = await UsersSchema.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    return user === null;
  }

  async addUser(user: User): Promise<User> {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const birthdate = new Date(user.birthdate);
    console.log(user);
    console.log(birthdate);

    const createdUser = await UsersSchema.create({
      email: user.email,
      password: passwordHash,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      birthdate: user.birthdate,
    });

    return this.toDomain(createdUser); // Convertimos el esquema a entidad de dominio
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await UsersSchema.findByPk(userId, {
      include: ['routines'],
    });
    return user ? this.toDomain(user) : null;
  }

  private toDomain(userSchema: UsersSchema): User {
    return userSchemaToDomain(userSchema);
  }
}
