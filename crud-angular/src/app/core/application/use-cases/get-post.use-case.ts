import { Injectable, Inject } from '@angular/core';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { POST_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class GetPostUseCase {
  constructor(@Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepository) {}

  async execute(id: string): Promise<Post | null> {
    if (!id) {
      throw new Error('Post ID is required');
    }

    return await this.postRepository.findById(id);
  }
}
