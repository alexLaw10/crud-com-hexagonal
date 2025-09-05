import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { PostAdapter } from '../../infrastructure/adapters/post.adapter';
import { PostDto, CreatePostDto, UpdatePostDto } from '../../application/dtos/post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private postAdapter: PostAdapter) {}

  createPost(createPostDto: CreatePostDto): Observable<PostDto> {
    return from(this.postAdapter.createPost(createPostDto).then(post => this.postAdapter.toDto(post)));
  }

  getPostById(id: string): Observable<PostDto | null> {
    return from(this.postAdapter.getPostById(id).then(post => post ? this.postAdapter.toDto(post) : null));
  }

  getAllPosts(): Observable<PostDto[]> {
    return from(this.postAdapter.getAllPosts().then(posts => posts.map(post => this.postAdapter.toDto(post))));
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): Observable<PostDto> {
    return from(this.postAdapter.updatePost(id, updatePostDto).then(post => this.postAdapter.toDto(post)));
  }

  deletePost(id: string): Observable<void> {
    return from(this.postAdapter.deletePost(id));
  }
}
