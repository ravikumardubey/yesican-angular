import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/core/models/books.model';
import { BookService } from 'src/app/core/services/book.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  count: number = 1;
  page: number = 1;
  bookSubscription: Subscription;
  countSubscription: Subscription;
  constructor(
    private bookService: BookService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.bookSubscription = this.bookService.books$.subscribe((res) => {
      if (res) {
        this.books = res;
      }
    });
    this.countSubscription = this.bookService.count.subscribe((res) => {
      this.count = res;
    });
  }
  ngOnInit(): void {
    this.bookService.getAllBooks();
  }
  ngOnDestroy(): void {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
  }
  selectPage(page: number) {
    this.page = page;
    this.bookService.getAllBooks(this.page.toString());
  }
  checkAllCheckBox(ev: any) {
    this.books.forEach((x) => (x.checked = ev.target.checked));
  }
  get showLoading(): boolean {
    return this.bookService.showLoading.value;
  }
  isAllCheckBoxChecked() {
    return this.books.every((p) => p.checked);
  }
  openBookEdit(id: any) {
    this.router.navigate(['/admin/books/edit/' + id]);
  }
  deleteBook(id: number) {
    this.bookService.deleteBook(id.toString()).subscribe(() => {
      this.books = this.books.filter((item) => item.id !== id);
      this.sharedService.showSuccessNotification('Success!');
    });
  }
}
