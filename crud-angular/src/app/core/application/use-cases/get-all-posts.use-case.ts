import { Injectable, Inject } from '@angular/core';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { POST_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class GetAllPostsUseCase {
  constructor(@Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }
}
