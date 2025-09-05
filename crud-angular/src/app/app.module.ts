import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './core/presentation/components/post-list.component';
import { PostEditComponent } from './core/presentation/components/post-edit.component';
import { CORE_PROVIDERS } from './core/infrastructure/config/dependency-injection.config';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ...CORE_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
