import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class GetLoginUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(username: string, password: string): Promise<User> {
    return await this.userRepository.getLoginUser(username, password);
  }
}
