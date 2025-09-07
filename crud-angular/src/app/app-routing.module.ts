import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./core/presentation/features/post/post.module').then(m => m.PostModule)
  },
  { 
    path: 'posts', 
    loadChildren: () => import('./core/presentation/features/post/post.module').then(m => m.PostModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
