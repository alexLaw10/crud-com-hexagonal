
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Shared Module
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { ModalComponent } from './modal/modal.component';

// Services - PostService é fornecido pelo CoreModule

// Routes
const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'posts', component: ListComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    FormComponent,
    EditComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    // PostService é fornecido pelo CoreModule
  ],
  exports: [
    ListComponent,
    ItemComponent,
    FormComponent,
    EditComponent,
    ModalComponent
  ]
})
export class PostModule { }
