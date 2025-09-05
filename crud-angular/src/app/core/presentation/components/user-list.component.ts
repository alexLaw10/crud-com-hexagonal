import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDto } from '../../application/dtos/user.dto';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <h2>Lista de Usuários</h2>
      <div *ngFor="let user of users" class="user-item">
        <span>{{ user.name }} - {{ user.email }}</span>
        <span [class]="user.isActive ? 'active' : 'inactive'">
          {{ user.isActive ? 'Ativo' : 'Inativo' }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 20px;
    }
    .user-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border: 1px solid #ccc;
      margin: 5px 0;
    }
    .active {
      color: green;
    }
    .inactive {
      color: red;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: UserDto[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Implementar carregamento de usuários
  }
}
