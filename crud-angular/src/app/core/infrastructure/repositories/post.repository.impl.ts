import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository.interface';
import { PostApiResponse } from '../../application/dtos/post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostRepositoryImpl implements PostRepository {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  findById(id: string): Promise<Post | null> {
    return new Promise((resolve, reject) => {
      this.http.get<PostApiResponse>(`${this.baseUrl}/${id}`)
        .pipe(
          map(apiResponse => this.mapApiResponseToEntity(apiResponse)),
          catchError(error => {
            console.error('Error fetching post:', error);
            return of(null);
          })
        )
        .subscribe({
          next: (post) => resolve(post),
          error: (error) => reject(error)
        });
    });
  }

  findAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<PostApiResponse[]>(this.baseUrl)
        .pipe(
          map(apiResponses => apiResponses.map(apiResponse => this.mapApiResponseToEntity(apiResponse))),
          catchError(error => {
            console.error('Error fetching posts:', error);
            return of([]);
          })
        )
        .subscribe({
          next: (posts) => resolve(posts),
          error: (error) => reject(error)
        });
    });
  }

  findByUserId(userId: number): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      this.http.get<PostApiResponse[]>(`${this.baseUrl}?userId=${userId}`)
        .pipe(
          map(apiResponses => apiResponses.map(apiResponse => this.mapApiResponseToEntity(apiResponse))),
          catchError(error => {
            console.error('Error fetching posts by user:', error);
            return of([]);
          })
        )
        .subscribe({
          next: (posts) => resolve(posts),
          error: (error) => reject(error)
        });
    });
  }

  save(post: Post): Promise<Post> {
    const postData = {
      title: post.title,
      body: post.body,
      userId: post.userId
    };

    return new Promise((resolve, reject) => {
      this.http.post<PostApiResponse>(this.baseUrl, postData)
        .pipe(
          map(apiResponse => this.mapApiResponseToEntity(apiResponse)),
          catchError(error => {
            console.error('Error creating post:', error);
            throw error;
          })
        )
        .subscribe({
          next: (createdPost) => resolve(createdPost),
          error: (error) => reject(error)
        });
    });
  }

  update(post: Post): Promise<Post> {
    const postData = {
      id: parseInt(post.id),
      title: post.title,
      body: post.body,
      userId: post.userId
    };

    return new Promise((resolve, reject) => {
      this.http.put<PostApiResponse>(`${this.baseUrl}/${post.id}`, postData)
        .pipe(
          map(apiResponse => this.mapApiResponseToEntity(apiResponse)),
          catchError(error => {
            console.error('Error updating post:', error);
            throw error;
          })
        )
        .subscribe({
          next: (updatedPost) => resolve(updatedPost),
          error: (error) => reject(error)
        });
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.baseUrl}/${id}`)
        .pipe(
          catchError(error => {
            console.error('Error deleting post:', error);
            throw error;
          })
        )
        .subscribe({
          next: () => resolve(),
          error: (error) => reject(error)
        });
    });
  }

  private mapApiResponseToEntity(apiResponse: PostApiResponse): Post {
    return new Post(
      apiResponse.id.toString(),
      apiResponse.title,
      apiResponse.body,
      apiResponse.userId,
      new Date(), // API não retorna createdAt
      new Date()  // API não retorna updatedAt
    );
  }
}
