import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../../../application/services/post.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { PostDto, CreatePostDto, UpdatePostDto } from '../../../../application/dtos/post.dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  public posts: PostDto[] = [];
  public displayedPosts: PostDto[] = [];
  public loading = false;
  public loadingMore = false;
  public error: string | null = null;
  public showCreateForm = false;
  public showEditModal = false;
  public selectedPost: PostDto | null = null;
  public postsPerPage = 5;
  public hasMorePosts = true;

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadPosts();
  }

  public loadPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.displayedPosts = posts.slice(0, this.postsPerPage);
        this.hasMorePosts = posts.length > this.postsPerPage;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = 'Erro ao carregar posts: ' + error.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  public loadMorePosts(): void {
    if (this.loadingMore || !this.hasMorePosts) return;

    this.loadingMore = true;
    const currentLength = this.displayedPosts.length;
    const nextBatch = this.posts.slice(currentLength, currentLength + this.postsPerPage);
    
    // Simular delay de carregamento
    setTimeout(() => {
      this.displayedPosts = [...this.displayedPosts, ...nextBatch];
      this.hasMorePosts = this.displayedPosts.length < this.posts.length;
      this.loadingMore = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  public toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    this.clearError();
  }

  public createPost(createData: CreatePostDto | UpdatePostDto): void {
    this.loading = true;
    this.error = null;

    // Convert to CreatePostDto if needed
    const createPostData: CreatePostDto = {
      title: createData.title || '',
      body: createData.body || '',
      userId: createData.userId || 1
    };

    this.postService.createPost(createPostData).subscribe({
      next: (createdPost) => {
        this.posts.unshift(createdPost);
        this.displayedPosts = this.posts.slice(0, this.displayedPosts.length + 1);
        this.hasMorePosts = this.displayedPosts.length < this.posts.length;
        this.showCreateForm = false;
        this.loading = false;
        this.toastService.showSuccess('Post criado com sucesso!');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.cdr.detectChanges();
        // Error será tratado pelo interceptor
      }
    });
  }

  public editPost(post: PostDto): void {
    this.selectedPost = post;
    this.showEditModal = true;
  }

  public closeEditModal(): void {
    this.showEditModal = false;
    this.selectedPost = null;
  }

  public updatePost(updateData: UpdatePostDto): void {
    if (!this.selectedPost) return;

    this.loading = true;
    this.error = null;

    this.postService.updatePost(this.selectedPost.id, updateData).subscribe({
      next: (updatedPost) => {
        const index = this.posts.findIndex(p => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.closeEditModal();
        this.loading = false;
        this.toastService.showSuccess('Post atualizado com sucesso!');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.cdr.detectChanges();
        // Error será tratado pelo interceptor
      }
    });
  }

  public deletePost(id: string): void {
    this.loading = true;
    this.error = null;

    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== id);
        this.displayedPosts = this.displayedPosts.filter(p => p.id !== id);
        this.hasMorePosts = this.displayedPosts.length < this.posts.length;
        this.loading = false;
        this.toastService.showSuccess('Post deletado com sucesso!');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.cdr.detectChanges();
        // Error será tratado pelo interceptor
      }
    });
  }

  public clearError(): void {
    this.error = null;
  }

  public trackByPostId(index: number, post: PostDto): string {
    return post.id;
  }
}