import { User } from '../entities/user.entity';

export interface UserService {
  validateUser(user: User): Promise<boolean>;
  sendWelcomeEmail(user: User): Promise<void>;
  notifyUserUpdate(user: User): Promise<void>;
}
