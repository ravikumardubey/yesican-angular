import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/core/models/books.model';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss'],
})
export class BooksContainerComponent implements OnInit, OnDestroy {
  active = 1;
  books: Book[] = [];
  booksSubscription: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private booksService: BookService
  ) {
    this.booksSubscription = this.booksService.books$.subscribe((res) => {
      this.books = res;
    });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.booksService.getAllBooksForHome();
  }
  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
  get showLoading(): boolean {
    return this.booksService.showLoading.value;
  }
  get hasNextPage(): boolean {
    return !!this.booksService.booksNextPage;
  }
  loadMore() {
    this.booksService.getAllBooksForHome(true);
  }
}
