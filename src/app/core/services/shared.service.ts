import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/toasts/toast-service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  nextUrl: string = '/';
  constructor(private toastService: ToastService) {}

  showNotification(text: string, className: string): void {
    text = (text || '').trim();
    if (text) {
      this.toastService.show(text, {
        classname: `toast-title ${className}`,
        delay: 3000,
      });
    }
  }

  showSuccessNotification(text: string): void {
    this.showNotification(text, 'success-toast-title');
  }

  showInfoNotification(text: string): void {
    this.showNotification(text, 'info-toast-title');
  }

  showErrorNotification(text: string): void {
    this.showNotification(text, 'error-toast-title');
  }

  showWarningNotification(text: string): void {
    this.showNotification(text, 'warning-toast-title');
  }
}
