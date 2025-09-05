import { Injectable, Inject } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class GetUserUseCase {
  constructor(@Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id) {
      throw new Error('User ID is required');
    }

    return await this.userRepository.findById(id);
  }
}
