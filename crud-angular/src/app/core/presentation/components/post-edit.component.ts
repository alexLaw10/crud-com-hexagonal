import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostDto, UpdatePostDto } from '../../application/dtos/post.dto';

@Component({
  selector: 'app-post-edit',
  template: `
    <div *ngIf="post">
      <h3>Editar Post</h3>
      <form (ngSubmit)="updatePost()">
        <div>
          <label>Título:</label>
          <input [(ngModel)]="editPost.title" name="title" required>
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea [(ngModel)]="editPost.body" name="body" required></textarea>
        </div>
        <div>
          <label>User ID:</label>
          <input [(ngModel)]="editPost.userId" name="userId" type="number" required>
        </div>
        <button type="submit" [disabled]="loading">Atualizar</button>
        <button type="button" (click)="cancel()">Cancelar</button>
      </form>
      <div *ngIf="error">{{ error }}</div>
    </div>
  `
})
export class PostEditComponent implements OnInit {
  @Input() post: PostDto | null = null;
  @Output() postUpdated = new EventEmitter<PostDto>();
  @Output() cancelled = new EventEmitter<void>();

  editPost: UpdatePostDto = {};
  loading = false;
  error: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    if (this.post) {
      this.editPost = {
        title: this.post.title,
        body: this.post.body,
        userId: this.post.userId
      };
    }
  }

  updatePost(): void {
    if (!this.post || !this.editPost.title || !this.editPost.body || !this.editPost.userId) {
      this.error = 'Todos os campos são obrigatórios';
      return;
    }

    this.loading = true;
    this.error = null;

    this.postService.updatePost(this.post.id, this.editPost).subscribe({
      next: (updatedPost) => {
        this.postUpdated.emit(updatedPost);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao atualizar post: ' + error.message;
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
