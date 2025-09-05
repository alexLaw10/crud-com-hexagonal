import { Injectable } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id) {
      throw new Error('User ID is required');
    }

    return await this.userRepository.findById(id);
  }
}
