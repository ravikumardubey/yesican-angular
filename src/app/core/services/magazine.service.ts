import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { MAGAZINE_LIST, MAGAZINE_DETAIL } from '../constants/api.constants';
import { PaginatedData } from '../models/pagination.model';
import { Magazine } from '../models/magazine.model';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  magazines$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);
  MagazineNextPage = '';
  showLoading = true;
  constructor(
    public http: HttpClient,
    private environmentService: EnvironmentService
  ) {}
  createMagazine(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${MAGAZINE_LIST}`, { ...data });
  }
  getMagazines(searchQuery = ''): Observable<any> {
    let params = {
      search: searchQuery,
    };
    return this.http.get<any>(`${this.baseUserUrl}${MAGAZINE_LIST}`, {
      params,
    });
  }

  getAllMagazines(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${MAGAZINE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Magazine,
            });
            this.magazines$.next(data.results);
            this.count.next(data.count);
          }
        },
        error: (error) => {
          return throwError(() => error);
        },
      });
  }
  getAllMagazinesForHome(loadMore = false): void {
    this.showLoading = true;

    let params = {
      page: loadMore ? this.MagazineNextPage : '1',
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${MAGAZINE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Magazine,
            });
            if (loadMore) {
              this.magazines$.next([
                ...this.magazines$.getValue(),
                ...data.results,
              ]);
            } else {
              this.magazines$.next(data.results);
            }
            this.showLoading = false;
            this.MagazineNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading = false;
          return throwError(() => error);
        },
      });
  }
  updateMagazine(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUserUrl}${MAGAZINE_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
  deleteMagazine(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${MAGAZINE_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
}
