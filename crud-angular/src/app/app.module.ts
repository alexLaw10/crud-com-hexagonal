import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMenuComponent, ToastComponent } from './shared';
import { 
  ListComponent, 
  ItemComponent, 
  FormComponent, 
  ModalComponent, 
  EditComponent 
} from './core/presentation/features/post';
import { ErrorInterceptor } from './core/infrastructure/interceptors/error.interceptor';
import { CORE_PROVIDERS } from './core/infrastructure/config/dependency-injection.config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    ListComponent,
    ItemComponent,
    FormComponent,
    ModalComponent,
    EditComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ...CORE_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
