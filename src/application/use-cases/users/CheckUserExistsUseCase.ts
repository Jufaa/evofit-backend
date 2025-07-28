import { IUserRepository } from '@domain/repositories/IUserRepository';

export class CheckUserExistsUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(username: string): Promise<boolean> {
    return await this.userRepository.checkUserExists(username);
  }
}
