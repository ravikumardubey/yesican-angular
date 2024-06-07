import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { GalleryCategoriesComponent } from './photos/gallery-categories/gallery-categories.component';
import { AddPhotosComponent } from './photos/add-photos/add-photos.component';
import { TimeFormatPipe } from '../../../core/pipes/time-format.pipe';

@NgModule({
  declarations: [
    PhotosComponent,
    YoutubeComponent,
    GalleryCategoriesComponent,
    AddPhotosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GalleryRoutingModule,
    ImageCropperComponent,
    NgbPaginationModule,
    TimeFormatPipe,
    NgbDropdownModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryModule {}
