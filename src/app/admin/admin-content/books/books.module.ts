import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BooksCreateEditComponent } from './books-create-edit/books-create-edit.component';
import {
  NgbDatepickerModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { TimeFormatPipe } from '../../../core/pipes/time-format.pipe';

@NgModule({
  declarations: [BooksComponent, BooksCreateEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    ImageCropperComponent,
    TimeFormatPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
