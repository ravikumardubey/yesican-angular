import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../models/pagination.model';
import { Contact } from '../models/contactus.model';
import { CONTACT_US_DETAIL, CONTACT_US_LIST } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  contactus$ = new BehaviorSubject<any>('');
  contactusNextPage = '';
  showLoading = new BehaviorSubject<boolean>(true);
  count = new BehaviorSubject<number>(1);

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}

  getContactus(loadMore = false): void {
    const params = {
      page: loadMore ? this.contactusNextPage || '1' : '1',
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${CONTACT_US_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Contact,
            });
            if (loadMore) {
              this.contactus$.next([...this.contactus$.value, ...data.results]);
            } else {
              this.contactus$.next(data.results);
            }
            this.showLoading.next(false);
            this.contactusNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }
  getAllContactus(page = '1'): void {
    this.showLoading.next(true);
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${CONTACT_US_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Contact,
            });
            this.contactus$.next(data.results);
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
  createContactus(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${CONTACT_US_LIST}`, { ...data });
  }
  deleteContactus(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${CONTACT_US_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
  updateContactus(id: string, data: any): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUserUrl}${CONTACT_US_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
}
