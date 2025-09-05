import { Provider } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { UserService } from '../../domain/services/user.service.interface';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { UserServiceImpl } from '../services/user.service.impl';

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: UserRepository,
    useClass: UserRepositoryImpl
  },
  {
    provide: UserService,
    useClass: UserServiceImpl
  }
];
