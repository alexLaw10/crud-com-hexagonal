import { Provider, InjectionToken } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { UserService } from '../../domain/services/user.service.interface';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { PostRepositoryImpl } from '../repositories/post.repository.impl';
import { UserServiceImpl } from '../services/user.service.impl';

export const USER_REPOSITORY_TOKEN = new InjectionToken<UserRepository>('UserRepository');
export const POST_REPOSITORY_TOKEN = new InjectionToken<PostRepository>('PostRepository');
export const USER_SERVICE_TOKEN = new InjectionToken<UserService>('UserService');

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: USER_REPOSITORY_TOKEN,
    useClass: UserRepositoryImpl
  },
  {
    provide: POST_REPOSITORY_TOKEN,
    useClass: PostRepositoryImpl
  },
  {
    provide: USER_SERVICE_TOKEN,
    useClass: UserServiceImpl
  }
];
