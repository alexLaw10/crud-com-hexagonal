import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostDto, CreatePostDto } from '../../application/dtos/post.dto';

@Component({
  selector: 'app-post-list',
  template: `
    <div>
      <h2>Lista de Posts</h2>
      <button (click)="loadPosts()">Carregar Posts</button>
      <button (click)="showCreateForm = !showCreateForm">
        {{ showCreateForm ? 'Cancelar' : 'Novo Post' }}
      </button>
      
      <div *ngIf="showCreateForm">
        <h3>Criar Novo Post</h3>
        <form (ngSubmit)="createPost()">
          <div>
            <label>Título:</label>
            <input [(ngModel)]="newPost.title" name="title" required>
          </div>
          <div>
            <label>Conteúdo:</label>
            <textarea [(ngModel)]="newPost.body" name="body" required></textarea>
          </div>
          <div>
            <label>User ID:</label>
            <input [(ngModel)]="newPost.userId" name="userId" type="number" required>
          </div>
          <button type="submit">Criar Post</button>
        </form>
      </div>

      <div *ngIf="loading">Carregando...</div>
      <div *ngIf="error">{{ error }}</div>
      
      <div *ngFor="let post of posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p><strong>User ID:</strong> {{ post.userId }}</p>
        <p><strong>ID:</strong> {{ post.id }}</p>
        <button (click)="editPost(post)">Editar</button>
        <button (click)="deletePost(post.id)">Deletar</button>
        <hr>
      </div>
    </div>
  `
})
export class PostListComponent implements OnInit {
  posts: PostDto[] = [];
  loading = false;
  error: string | null = null;
  showCreateForm = false;
  
  newPost: CreatePostDto = {
    title: '',
    body: '',
    userId: 1
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar posts: ' + error.message;
        this.loading = false;
      }
    });
  }

  createPost(): void {
    if (!this.newPost.title || !this.newPost.body || !this.newPost.userId) {
      this.error = 'Todos os campos são obrigatórios';
      return;
    }

    this.loading = true;
    this.error = null;

    this.postService.createPost(this.newPost).subscribe({
      next: (createdPost) => {
        this.posts.unshift(createdPost);
        this.newPost = { title: '', body: '', userId: 1 };
        this.showCreateForm = false;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao criar post: ' + error.message;
        this.loading = false;
      }
    });
  }

  editPost(post: PostDto): void {
    // Implementar edição
    console.log('Editando post:', post);
  }

  deletePost(id: string): void {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      this.loading = true;
      this.error = null;

      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== id);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erro ao deletar post: ' + error.message;
          this.loading = false;
        }
      });
    }
  }
}
