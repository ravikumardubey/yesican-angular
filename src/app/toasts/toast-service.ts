import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    const toastToAdd = { textOrTpl, ...options };
    if (
      !this.toasts.some((toast) => toast.textOrTpl === toastToAdd.textOrTpl)
    ) {
      this.toasts.push(toastToAdd);
    }
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
