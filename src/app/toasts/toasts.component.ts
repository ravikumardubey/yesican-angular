import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <div class="p-3">
        <div class="text-center pb-2">
          <img [src]="getImageSrc(toast.classname)" />
        </div>
        <div class="text-center">
          <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
            <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
          </ng-template>

          <ng-template #text>{{ toast.textOrTpl }}</ng-template>
        </div>
        <div class="text-center">
          <div
            class=" btn btn-light rounded mt-3 px-3 cursor-pointer "
            (click)="toastService.remove(toast)"
          >
            OK
          </div>
        </div>
      </div>
    </ngb-toast>
  `,
  styleUrls: ['./toasts.component.scss'],
  host: { '[class.ngb-toasts]': 'true' },
  standalone: true,
  imports: [NgbToastModule, CommonModule],
})
export class ToastsComponent {
  classnameToImageMap = new Map([
    ['toast-title success-toast-title', 'assets/icons/success.svg'],
    ['toast-title error-toast-title', 'assets/icons/error.svg'],
    ['toast-title info-toast-title', 'assets/icons/info.svg'],
    ['toast-title warning-toast-title', 'assets/icons/warning.svg'],
  ]);

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  getImageSrc(classname: string) {
    return this.classnameToImageMap.get(classname) || '';
  }
}
