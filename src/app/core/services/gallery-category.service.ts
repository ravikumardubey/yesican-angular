import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  IMAGE_CATEGORY_DETAIL,
  IMAGE_CATEGORY_LIST,
} from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../models/pagination.model';
import { Category } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryCategoryService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  categories$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);
  searchQuery: string = '';
  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}
  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${IMAGE_CATEGORY_LIST}`, {
      ...data,
    });
  }
  getCategories(searchQuery = ''): Observable<any> {
    let params = {
      search: searchQuery,
    };
    return this.http.get<any>(`${this.baseUserUrl}${IMAGE_CATEGORY_LIST}`, {
      params,
    });
  }
  get commonParams(): any {
    return {
      search: this.searchQuery || '',
    };
  }

  getAllCategories(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      ...this.commonParams,
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${IMAGE_CATEGORY_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Category,
            });
            this.categories$.next(data.results);
            this.count.next(data.count);
          }
        },
        error: (error) => {
          return throwError(() => error);
        },
      });
  }
  updateCategory(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUserUrl}${IMAGE_CATEGORY_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${IMAGE_CATEGORY_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
}
