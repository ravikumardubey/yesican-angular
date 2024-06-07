import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { VideosComponent } from './videos/videos.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from '../page-title/page-title.component';

@NgModule({
  declarations: [PhotosComponent, VideosComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    NgbCarouselModule,
    PageTitleComponent,
    NgbNavModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryModule {}
