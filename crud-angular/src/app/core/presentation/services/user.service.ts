import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserAdapter } from '../../infrastructure/adapters/user.adapter';
import { UserDto, CreateUserDto } from '../../application/dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userAdapter: UserAdapter) {}

  createUser(userData: CreateUserDto): Observable<UserDto> {
    const request = this.userAdapter.fromCreateDto(userData);
    return new Observable(observer => {
      this.userAdapter.createUser(request)
        .then(user => {
          const dto = this.userAdapter.toDto(user);
          observer.next(dto);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  getUserById(id: string): Observable<UserDto | null> {
    return new Observable(observer => {
      this.userAdapter.getUserById(id)
        .then(user => {
          const dto = user ? this.userAdapter.toDto(user) : null;
          observer.next(dto);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}
