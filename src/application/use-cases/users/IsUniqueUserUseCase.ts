import { IUserRepository } from '@domain/repositories/IUserRepository';

export class IsUniqueUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(username: string, email: string): Promise<boolean> {
    return await this.userRepository.isUniqueUser(username, email);
  }
}
