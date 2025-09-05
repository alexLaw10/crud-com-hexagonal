import { Injectable } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserPort, CreateUserRequest, UpdateUserRequest } from '../../application/ports/user.port';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { UserDto, CreateUserDto, UpdateUserDto } from '../../application/dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements UserPort {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase
  ) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    return await this.createUserUseCase.execute(userData);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.getUserUseCase.execute(id);
  }

  async getAllUsers(): Promise<User[]> {
    // Implementar quando necessário
    throw new Error('Method not implemented.');
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    // Implementar quando necessário
    throw new Error('Method not implemented.');
  }

  async deleteUser(id: string): Promise<void> {
    // Implementar quando necessário
    throw new Error('Method not implemented.');
  }

  // Métodos de conversão DTO <-> Entity
  toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  }

  fromCreateDto(dto: CreateUserDto): CreateUserRequest {
    return {
      name: dto.name,
      email: dto.email
    };
  }
}
