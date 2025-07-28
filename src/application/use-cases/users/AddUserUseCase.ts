import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class AddUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(user: User): Promise<User> {
    return await this.userRepository.addUser(user);
  }
}
