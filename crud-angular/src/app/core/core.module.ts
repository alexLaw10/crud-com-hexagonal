import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { PostService } from './application/services/post.service';
import { PostAdapter } from './application/adapters/post.adapter';

// Interceptors
import { ErrorInterceptor } from './infrastructure/interceptors/error.interceptor';

// Config
import { CORE_PROVIDERS } from './infrastructure/config/dependency-injection.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ...CORE_PROVIDERS,
    PostService,
    PostAdapter,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado. Import apenas no AppModule.');
    }
  }
}
