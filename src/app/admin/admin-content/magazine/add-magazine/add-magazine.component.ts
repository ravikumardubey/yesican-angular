import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, concatMap, of, tap, throwError } from 'rxjs';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { MagazineService } from 'src/app/core/services/magazine.service';
import { SharedService } from 'src/app/core/services/shared.service';
@Component({
  selector: 'app-add-magazine',
  templateUrl: './add-magazine.component.html',
  styleUrls: ['./add-magazine.component.scss'],
})
export class AddMagazineComponent implements OnInit, OnDestroy {
  image!: string;
  imageFileName = '';
  imageFile: any;
  imageChangedEvent: any;
  pdfFile?: File;
  @ViewChild('pdfInputRef') pdfInputRef!: ElementRef;
  fileupload!: Subscription;
  isUploadStarted = false;
  progress = 0;
  remainingTime = 0;
  uploadText = '';
  showAddBtn = true;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private fileUploadService: FileUploadService,
    private magazineService: MagazineService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.fileupload?.unsubscribe();
  }
  onSelect(event: any, content: any): void {
    this.imageFileName = event.target.files[0].name;
    this.modalService.open(content, {
      centered: true,
    });
    this.imageChangedEvent = event;
  }

  close() {
    this.modalService.dismissAll();
  }
  updateImage(image: any) {
    this.image = image;
  }
  clearImage() {
    this.image = '';
  }
  updateImageFile(image: any) {
    this.imageFile = image;
  }
  onPdfFileSelect(event: any) {
    this.pdfFile = event.target.files[0];
  }
  addMagazine() {
    if (this.imageFile && this.pdfFile) {
      this.showAddBtn = false;
      this.fileupload = this.fileUploadService
        .uploadFile(this.imageFile)
        .pipe(
          tap((imageRes) => {
            this.isUploadStarted = true;
            this.uploadText = 'Cover Image';
            this.progress = imageRes.progress;
            this.remainingTime = imageRes.remainingTime;
          }),
          concatMap((imageRes) => {
            if (imageRes.success) {
              this.isUploadStarted = false;
              this.progress = 0;
              this.remainingTime = 0;
              return this.fileUploadService.uploadFile(this.pdfFile).pipe(
                tap((pdfRes) => {
                  this.isUploadStarted = true;
                  this.uploadText = 'Pdf File';
                  this.progress = pdfRes.progress;
                  this.remainingTime = pdfRes.remainingTime;
                }),
                concatMap((pdfRes) => {
                  if (pdfRes.success) {
                    this.progress = 0;
                    this.remainingTime = 0;
                    this.isUploadStarted = false;
                    let data: any = {};
                    data['image'] = imageRes.uuid;
                    data['magazine'] = pdfRes.uuid;
                    data['title'] = this.imageFileName;
                    data['is_enabled'] = true;
                    return this.magazineService.createMagazine(data);
                  } else {
                    return of(null);
                  }
                })
              );
            } else {
              return of(null);
            }
          })
        )
        .subscribe({
          complete: () => {
            this.magazineService.getAllMagazines();
            this.image = '';
            this.pdfFile = undefined;
            this.pdfInputRef.nativeElement.value = '';
            this.sharedService.showSuccessNotification(
              'Magazine Added Successfully!'
            );
            this.showAddBtn = true;
          },
          error: (error: Error) => {
            this.progress = 0;
            this.isUploadStarted = false;
            this.showAddBtn = true;
            throwError(() => error);
          },
        });
    }
  }
}
