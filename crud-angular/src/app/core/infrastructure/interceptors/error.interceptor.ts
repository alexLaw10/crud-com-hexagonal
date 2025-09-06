import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro inesperado';

        if (error.error instanceof ErrorEvent) {
          // Erro do cliente
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          // Erro do servidor
          switch (error.status) {
            case 400:
              errorMessage = 'Dados inválidos enviados';
              break;
            case 401:
              errorMessage = 'Não autorizado. Faça login novamente';
              break;
            case 403:
              errorMessage = 'Acesso negado';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado';
              break;
            case 500:
              errorMessage = 'Erro interno do servidor';
              break;
            case 0:
              errorMessage = 'Erro de conexão. Verifique sua internet';
              break;
            default:
              errorMessage = `Erro ${error.status}: ${error.statusText}`;
          }
        }

        // Log do erro para debugging
        console.error('HTTP Error:', error);

        // Mostrar toast de erro
        this.toastService.showError(errorMessage);

        return throwError(() => error);
      })
    );
  }
}
