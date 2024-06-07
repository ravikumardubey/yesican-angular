import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { BOOK_LIST, BOOK_DETAIL } from '../constants/api.constants';
import { PaginatedData } from '../models/pagination.model';
import { EnvironmentService } from './environment.service';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  books$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);
  booksNextPage = '';
  showLoading = new BehaviorSubject<boolean>(true);
  constructor(
    public http: HttpClient,
    private environmentService: EnvironmentService
  ) {}
  createBook(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${BOOK_LIST}`, { ...data });
  }
  getBooks(searchQuery = ''): Observable<any> {
    let params = {
      search: searchQuery,
    };
    return this.http.get<any>(`${this.baseUserUrl}${BOOK_LIST}`, {
      params,
    });
  }

  getAllBooks(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${BOOK_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Book,
            });
            this.books$.next(data.results);
            this.count.next(data.count);
            this.showLoading.next(false);
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }
  getAllBooksForHome(loadMore = false): void {
    this.showLoading.next(true);
    let params = {
      page: loadMore ? this.booksNextPage : '1',
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${BOOK_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Book,
            });
            if (loadMore) {
              this.books$.next([...this.books$.getValue(), ...data.results]);
            } else {
              this.books$.next(data.results);
            }
            this.showLoading.next(false);
            this.booksNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUserUrl}${BOOK_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
  updateBook(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUserUrl}${BOOK_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${BOOK_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
}
