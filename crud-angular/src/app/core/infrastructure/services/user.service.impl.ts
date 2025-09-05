import { Injectable } from '@angular/core';
import { User } from '../../domain/entities/user.entity';
import { UserService } from '../../domain/services/user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceImpl implements UserService {
  async validateUser(user: User): Promise<boolean> {
    // Validações de negócio
    if (!user.name || user.name.trim().length === 0) {
      return false;
    }
    
    if (!user.email || !this.isValidEmail(user.email)) {
      return false;
    }

    return true;
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    // Simulação de envio de email
    console.log(`Welcome email sent to ${user.email}`);
  }

  async notifyUserUpdate(user: User): Promise<void> {
    // Simulação de notificação
    console.log(`User ${user.name} has been updated`);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
