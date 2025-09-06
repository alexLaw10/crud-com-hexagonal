import { Provider, InjectionToken } from '@angular/core';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { PostRepositoryImpl } from '../repositories/post.repository.impl';
import { PostPort } from '../../application/ports/post.port';
import { PostAdapter } from '../../application/adapters/post.adapter';

export const POST_REPOSITORY_TOKEN = new InjectionToken<PostRepository>('PostRepository');
export const POST_PORT_TOKEN = new InjectionToken<PostPort>('PostPort');

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: POST_REPOSITORY_TOKEN,
    useClass: PostRepositoryImpl
  },
  {
    provide: POST_PORT_TOKEN,
    useClass: PostAdapter
  }
];
