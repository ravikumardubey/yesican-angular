import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksContainerComponent } from './books-container/books-container.component';
import { BookCardComponent } from './books-container/book-card/book-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleComponent } from '../page-title/page-title.component';

@NgModule({
  declarations: [BooksContainerComponent, BookCardComponent],
  imports: [CommonModule, BooksRoutingModule, NgbModule, PageTitleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
