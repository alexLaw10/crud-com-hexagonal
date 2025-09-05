import { Injectable, Inject } from '@angular/core';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { UpdatePostDto } from '../dtos/post.dto';
import { POST_REPOSITORY_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class UpdatePostUseCase {
  constructor(@Inject(POST_REPOSITORY_TOKEN) private postRepository: PostRepository) {}

  async execute(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    if (!id) {
      throw new Error('Post ID is required');
    }

    // Buscar o post existente
    const existingPost = await this.postRepository.findById(id);
    if (!existingPost) {
      throw new Error('Post not found');
    }

    // Validações de negócio
    if (updatePostDto.title !== undefined && updatePostDto.title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }

    if (updatePostDto.body !== undefined && updatePostDto.body.trim().length === 0) {
      throw new Error('Body cannot be empty');
    }

    if (updatePostDto.userId !== undefined && updatePostDto.userId <= 0) {
      throw new Error('Valid userId is required');
    }

    // Atualizar a entidade
    let updatedPost = existingPost;

    if (updatePostDto.title !== undefined) {
      updatedPost = updatedPost.updateTitle(updatePostDto.title.trim());
    }

    if (updatePostDto.body !== undefined) {
      updatedPost = updatedPost.updateBody(updatePostDto.body.trim());
    }

    if (updatePostDto.title !== undefined && updatePostDto.body !== undefined) {
      updatedPost = updatedPost.updateContent(
        updatePostDto.title.trim(),
        updatePostDto.body.trim()
      );
    }

    // Persistência
    return await this.postRepository.update(updatedPost);
  }
}
