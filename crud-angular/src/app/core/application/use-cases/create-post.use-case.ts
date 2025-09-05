import { Injectable, Inject } from '@angular/core';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { CreatePostDto } from '../dtos/post.dto';
import { POST_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class CreatePostUseCase {
  constructor(@Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepository) {}

  async execute(createPostDto: CreatePostDto): Promise<Post> {
    // Validações de negócio
    if (!createPostDto.title || createPostDto.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    if (!createPostDto.body || createPostDto.body.trim().length === 0) {
      throw new Error('Body is required');
    }

    if (!createPostDto.userId || createPostDto.userId <= 0) {
      throw new Error('Valid userId is required');
    }

    // Criação da entidade
    const post = new Post(
      this.generateId(),
      createPostDto.title.trim(),
      createPostDto.body.trim(),
      createPostDto.userId,
      new Date(),
      new Date()
    );

    // Persistência
    return await this.postRepository.save(post);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
