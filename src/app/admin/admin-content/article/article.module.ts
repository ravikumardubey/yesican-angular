import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ArticleRoutingModule } from './article-routing.module';
import { PostCreateEditComponent } from './post-create-edit/post-create-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    PostCreateEditComponent,
    PostsComponent,
    CategoriesComponent,
    TagsComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    ImageCropperComponent,
    NgSelectModule,
    ConfirmationModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleModule {}
