import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  Input,
  ViewChild,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, NgbModule],
})
export class ConfirmationModalComponent {
  @ViewChild('confirmationModal')
  private modalContent!: TemplateRef<ConfirmationModalComponent>;
  @Output() newConfirmationEvent = new EventEmitter<string>();
  @Input() modalTitle: any;
  @Input() modalBody: any;
  private modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(
        (result) => {
          this.newConfirmationEvent.emit(result);
        },
        (reason) => {}
      );
    });
  }
}
