import { Injectable } from '@angular/core';
import { Post } from '../../domain/entities/post.entity';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { GetPostUseCase } from '../../application/use-cases/get-post.use-case';
import { GetAllPostsUseCase } from '../../application/use-cases/get-all-posts.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/update-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/delete-post.use-case';
import { PostDto, CreatePostDto, UpdatePostDto } from '../../application/dtos/post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostAdapter {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private getPostUseCase: GetPostUseCase,
    private getAllPostsUseCase: GetAllPostsUseCase,
    private updatePostUseCase: UpdatePostUseCase,
    private deletePostUseCase: DeletePostUseCase
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return await this.createPostUseCase.execute(createPostDto);
  }

  async getPostById(id: string): Promise<Post | null> {
    return await this.getPostUseCase.execute(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.getAllPostsUseCase.execute();
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.updatePostUseCase.execute(id, updatePostDto);
  }

  async deletePost(id: string): Promise<void> {
    return await this.deletePostUseCase.execute(id);
  }

  // Métodos de conversão DTO <-> Entity
  toDto(post: Post): PostDto {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    };
  }

  fromCreateDto(dto: CreatePostDto): CreatePostDto {
    return {
      title: dto.title,
      body: dto.body,
      userId: dto.userId
    };
  }

  fromUpdateDto(dto: UpdatePostDto): UpdatePostDto {
    return {
      title: dto.title,
      body: dto.body,
      userId: dto.userId
    };
  }
}
