import {
  Component,
  OnDestroy,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of, throwError } from 'rxjs';
import { constructAll } from 'src/app/core/utils/base.utils';
import { Category } from 'src/app/core/models/article.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { GalleryCategoryService } from 'src/app/core/services/gallery-category.service';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.scss'],
})
export class AddPhotosComponent implements OnInit, OnDestroy {
  fileupload!: Subscription;
  isUploadStarted!: boolean;
  fileInput: any;
  categories: Category[] = [];
  selectedCategory = 0;
  image = '';
  imageFileName = '';
  imageChangedEvent: any;
  croppedImage?: File;
  progress = 0;
  remainingTime = 0;
  @Output() close = new EventEmitter<any>();
  constructor(
    private fileUploadService: FileUploadService,
    private galleryService: GalleryService,
    private categoryService: GalleryCategoryService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      if (res) {
        this.categories = constructAll(res.results, Category);
      }
    });
  }

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

  updateImage(image: any) {
    this.image = image;
  }
  updateCroppedImage(croppedImage: any) {
    this.croppedImage = croppedImage;
  }
  clearImage() {
    this.image = '';
  }

  uploadFile() {
    if (this.croppedImage) {
      this.fileupload = (
        this.croppedImage
          ? this.fileUploadService.uploadFile(this.croppedImage)
          : of({
              success: true,
              progress: 100,
            })
      ).subscribe({
        next: (res) => {
          if (res) {
            this.isUploadStarted = true;
            this.progress = res.progress;
            this.remainingTime = res.remainingTime;
            if (res.success) {
              let data: any = {};
              data['image'] = res.uuid;
              data['category'] = this.selectedCategory;
              data['title'] = this.imageFileName;
              this.galleryService.createImage(data).subscribe({
                next: () => {
                  this.galleryService.getImages();
                  this.image = '';
                  this.croppedImage = undefined;
                  this.isUploadStarted = false;
                  this.sharedService.showSuccessNotification(
                    'Photo Uploaded Successfully!'
                  );
                },
                error: (error: Error) => {
                  this.isUploadStarted = false;
                  throwError(() => error);
                },
              });
            }
            if (res.error) {
              this.isUploadStarted = false;
              this.progress = 0;
            }
          }
        },
        error: (error) => {
          this.sharedService.showErrorNotification('Photo Upload Failed!');
          this.isUploadStarted = false;
          this.progress = 0;
          throwError(() => error);
        },
      });
    }
  }
  truncateFilename(filename: string, maxLength: number): string {
    if (filename.length <= maxLength) {
      return filename;
    }
    const startLength = Math.floor(maxLength / 2) - 1;
    const endLength = Math.ceil(maxLength / 2) - 1;
    const truncatedName =
      filename.substring(0, startLength) +
      '...' +
      filename.substring(filename.length - endLength);
    return truncatedName;
  }
  closeImageAdd() {
    this.close.emit();
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}
