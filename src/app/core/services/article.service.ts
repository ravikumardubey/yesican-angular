import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  ARTICLE_DETAIL,
  ARTICLE_LIST,
} from 'src/app/core/constants/api.constants';
import { Article } from 'src/app/core/models/article.model';
import { PaginatedData } from 'src/app/core/models/pagination.model';
import { EnvironmentService } from 'src/app/core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  articles$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);
  searchQuery: string = '';
  selectedCategory = new BehaviorSubject<number>(0);
  selectedStatus = new BehaviorSubject<any>('');
  showLoading = new BehaviorSubject<boolean>(true);
  articlesNextPage = '';
  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}
  getArticleById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUserUrl}${ARTICLE_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
  get commonParams(): any {
    return {
      search: this.searchQuery || '',
    };
  }

  getArticles(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    this.showLoading.next(true);
    let params = {
      ...this.commonParams,
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${ARTICLE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Article,
            });
            this.articles$.next(data.results);
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
  getArticlesForHome(loadMore = false): void {
    this.showLoading.next(true);
    let statusParams = {};
    if (this.selectedStatus.value.text === 'is_published') {
      statusParams = {
        is_published: this.selectedStatus.value.value,
      };
    }
    if (this.selectedStatus.value.text === 'is_upcoming') {
      statusParams = {
        is_upcoming: this.selectedStatus.value.value,
      };
    }
    let categoryParams = {};
    if (this.selectedCategory.value) {
      categoryParams = {
        category__id: this.selectedCategory.value,
      };
    }
    const params = {
      ...statusParams,
      ...categoryParams,
      page: loadMore ? this.articlesNextPage || '1' : '1',
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${ARTICLE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Article,
            });
            if (loadMore) {
              this.articles$.next([...this.articles$.value, ...data.results]);
            } else {
              this.articles$.next(data.results);
            }
            this.showLoading.next(false);
            this.articlesNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }
  createArticle(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUserUrl}${ARTICLE_LIST}`, {
      ...data,
    });
  }
  updateArticle(id: string, data: any): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUserUrl}${ARTICLE_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
  deleteArticle(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${ARTICLE_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
}
