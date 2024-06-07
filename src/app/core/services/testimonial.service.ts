import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../models/pagination.model';
import {
  TESTIMONIAL_DETAIL,
  TESTIMONIAL_LIST,
} from '../constants/api.constants';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  testimonial$ = new BehaviorSubject<any>('');
  testimonialNextPage = '';
  showLoading = new BehaviorSubject<boolean>(true);
  selectedCategory = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}

  getTestimonial(loadMore = false): void {
    const params = {
      page: loadMore ? this.testimonialNextPage || '1' : '1',
      per_page: 12,
      category: this.selectedCategory.value,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${TESTIMONIAL_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Testimonial,
            });
            if (loadMore) {
              this.testimonial$.next([
                ...this.testimonial$.value,
                ...data.results,
              ]);
            } else {
              this.testimonial$.next(data.results);
            }
            this.showLoading.next(false);
            this.testimonialNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }
  getAllTestimonial(page = '1'): void {
    this.showLoading.next(true);
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${TESTIMONIAL_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Testimonial,
            });
            this.testimonial$.next(data.results);
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
  createTestimonial(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${TESTIMONIAL_LIST}`, {
      ...data,
    });
  }
  deleteTestimonial(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${TESTIMONIAL_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
  updateTestimonial(id: string, data: any): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUserUrl}${TESTIMONIAL_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
}
