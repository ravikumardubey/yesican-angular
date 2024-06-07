import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
  ImageCropperModule,
  base64ToFile,
} from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  standalone: true,
  imports: [CommonModule, ImageCropperModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageCropperComponent {
  @Output() closeModal = new EventEmitter<any>();
  @Output() image = new EventEmitter<any>();
  @Output() croppedImageUpdate = new EventEmitter<any>();
  croppedImage: any;
  width!: number;
  height!: number;
  transform: ImageTransform = {};
  canvasRotation = 0;
  rotation = 0;
  showLoading = true;
  scale = 1;
  @Input() aspectRatio: any;
  @Input() maintainAspectRatio = true;
  @Input() imageChangedEvent: any;
  @Input() imageFileName = '';

  cropImage() {
    this.image.emit(this.croppedImage);
    let blob = base64ToFile(this.croppedImage);
    let file = new File([blob], this.imageFileName, { type: blob.type });
    this.croppedImageUpdate.emit(file);
    this.closeModal.emit();
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    if (image.transformed) {
      this.showLoading = false;
    }
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    // console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    // console.log('Load failed');
  }
  rotateImage() {
    this.canvasRotation = this.canvasRotation + 1;
  }
  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }
  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
}
