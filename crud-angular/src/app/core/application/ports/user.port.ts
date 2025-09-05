import { User } from '../../domain/entities/user.entity';

export interface UserPort {
  createUser(userData: CreateUserRequest): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, userData: UpdateUserRequest): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  isActive?: boolean;
}
