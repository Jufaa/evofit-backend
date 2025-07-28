import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userId: number): Promise<User | null> {
    return await this.userRepository.getUserById(userId);
  }
}
