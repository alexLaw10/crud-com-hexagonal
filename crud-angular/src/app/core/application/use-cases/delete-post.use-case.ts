import { Injectable, Inject } from '@angular/core';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { POST_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class DeletePostUseCase {
  constructor(@Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Post ID is required');
    }

    // Verificar se o post existe
    const existingPost = await this.postRepository.findById(id);
    if (!existingPost) {
      throw new Error('Post not found');
    }

    // Deletar o post
    await this.postRepository.delete(id);
  }
}
