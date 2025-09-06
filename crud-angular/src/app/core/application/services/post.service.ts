import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { PostPort } from '../ports/post.port';
import { PostDto, CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { POST_PORT_TOKEN } from '../../infrastructure/config/dependency-injection.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(@Inject(POST_PORT_TOKEN) private postPort: PostPort) {}

  createPost(createPostDto: CreatePostDto): Observable<PostDto> {
    return from(this.postPort.createPost(createPostDto).then(post => this.postToDto(post)));
  }

  getPostById(id: string): Observable<PostDto | null> {
    return from(this.postPort.getPostById(id).then(post => post ? this.postToDto(post) : null));
  }

  getAllPosts(): Observable<PostDto[]> {
    return from(this.postPort.getAllPosts().then(posts => posts.map(post => this.postToDto(post))));
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): Observable<PostDto> {
    return from(this.postPort.updatePost(id, updatePostDto).then(post => this.postToDto(post)));
  }

  deletePost(id: string): Observable<void> {
    return from(this.postPort.deletePost(id));
  }

  private postToDto(post: any): PostDto {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    };
  }
}
