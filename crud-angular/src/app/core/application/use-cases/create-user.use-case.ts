import { Injectable } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserService } from '../../domain/services/user.service.interface';
import { CreateUserRequest } from '../ports/user.port';

@Injectable({
  providedIn: 'root'
})
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService
  ) {}

  async execute(request: CreateUserRequest): Promise<User> {
    // Validações de negócio
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Criação da entidade
    const user = new User(
      this.generateId(),
      request.name,
      request.email,
      true,
      new Date(),
      new Date()
    );

    // Validação adicional
    const isValid = await this.userService.validateUser(user);
    if (!isValid) {
      throw new Error('Invalid user data');
    }

    // Persistência
    const savedUser = await this.userRepository.save(user);

    // Notificações
    await this.userService.sendWelcomeEmail(savedUser);

    return savedUser;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
