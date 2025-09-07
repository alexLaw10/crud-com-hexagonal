import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderMenuComponent } from './components/header/header-menu.component';
import { ToastComponent } from './components/toast/toast.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { PostSkeletonComponent } from './components/skeleton/post-skeleton.component';

// Services
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [
    HeaderMenuComponent,
    ToastComponent,
    SkeletonComponent,
    PostSkeletonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    ToastService
  ],
  exports: [
    // Components
    HeaderMenuComponent,
    ToastComponent,
    SkeletonComponent,
    PostSkeletonComponent,
    // Modules
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
