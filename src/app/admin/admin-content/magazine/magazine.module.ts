import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine.component';
import { AddMagazineComponent } from './add-magazine/add-magazine.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { TimeFormatPipe } from '../../../core/pipes/time-format.pipe';

@NgModule({
  declarations: [MagazineComponent, AddMagazineComponent],
  imports: [
    CommonModule,
    MagazineRoutingModule,
    NgbPaginationModule,
    FormsModule,
    NgbModule,
    ImageCropperComponent,
    TimeFormatPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MagazineModule {}
