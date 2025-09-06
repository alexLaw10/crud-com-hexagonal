import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private toastCounter = 0;

  showSuccess(message: string, title: string = 'Sucesso', duration: number = 3000): void {
    this.addToast({
      type: 'success',
      title,
      message,
      duration
    });
  }

  showError(message: string, title: string = 'Erro', duration: number = 5000): void {
    this.addToast({
      type: 'error',
      title,
      message,
      duration
    });
  }

  showWarning(message: string, title: string = 'Aviso', duration: number = 4000): void {
    this.addToast({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  showInfo(message: string, title: string = 'Informação', duration: number = 3000): void {
    this.addToast({
      type: 'info',
      title,
      message,
      duration
    });
  }

  private addToast(toast: Omit<ToastMessage, 'id' | 'timestamp'>): void {
    const newToast: ToastMessage = {
      ...toast,
      id: `toast-${++this.toastCounter}`,
      timestamp: new Date()
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, newToast]);

    // Auto remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, toast.duration);
    }
  }

  removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const filteredToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(filteredToasts);
  }

  clearAll(): void {
    this.toastsSubject.next([]);
  }

  getToasts(): ToastMessage[] {
    return this.toastsSubject.value;
  }
}
