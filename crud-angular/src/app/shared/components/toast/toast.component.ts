import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast toast--{{ toast.type }}"
        [class.toast--show]="true"
        (click)="removeToast(toast.id)">
        <div class="toast__icon">
          <span [innerHTML]="getIcon(toast.type)"></span>
        </div>
        <div class="toast__content">
          <div class="toast__title">{{ toast.title }}</div>
          <div class="toast__message">{{ toast.message }}</div>
        </div>
        <button class="toast__close" (click)="removeToast(toast.id); $event.stopPropagation()">
          <span>✕</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  public toasts: ToastMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  public ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(
      toasts => this.toasts = toasts
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeToast(id: string): void {
    this.toastService.removeToast(id);
  }

  public getIcon(type: string): string {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type as keyof typeof icons] || 'ℹ️';
  }
}
