import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TAGS_DETAIL, TAGS_LIST } from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../models/pagination.model';
import { Tags } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  tags$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);
  searchQuery: string = '';
  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}
  createTag(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${TAGS_LIST}`, { ...data });
  }
  getTags(searchQuery = ''): Observable<any> {
    let params = {
      search: searchQuery,
    };
    return this.http.get<any>(`${this.baseUserUrl}${TAGS_LIST}`, {
      params,
    });
  }
  get commonParams(): any {
    return {
      search: this.searchQuery || '',
    };
  }

  getAllTags(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      ...this.commonParams,
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${TAGS_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Tags,
            });
            this.tags$.next(data.results);
            this.count.next(data.count);
          }
        },
        error: (error) => {
          return throwError(() => error);
        },
      });
  }
  updateTag(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUserUrl}${TAGS_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
  deleteTag(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${TAGS_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
}
