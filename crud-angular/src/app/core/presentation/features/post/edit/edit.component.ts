import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PostService } from '../../../../application/services/post.service';
import { PostDto, UpdatePostDto } from '../../../../application/dtos/post.dto';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() public post: PostDto | null = null;
  @Output() public postUpdated = new EventEmitter<PostDto>();
  @Output() public cancelled = new EventEmitter<void>();

  public editPost: UpdatePostDto = {};
  public loading = false;
  public error: string | null = null;

  constructor(private postService: PostService) {}

  public ngOnInit(): void {
    if (this.post) {
      this.editPost = {
        title: this.post.title,
        body: this.post.body,
        userId: this.post.userId
      };
    }
  }

  public updatePost(): void {
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

  public cancel(): void {
    this.cancelled.emit();
  }
}
