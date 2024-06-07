import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { SUBSCRIBE_URL } from '../constants/api.constants';
import { PaginatedData } from '../models/pagination.model';
import { Subscriber } from '../models/subscriber.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  subscribers$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);

  constructor(
    public http: HttpClient,
    private environmentService: EnvironmentService
  ) {}
  getAllSubscribers(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${SUBSCRIBE_URL}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Subscriber,
            });
            this.subscribers$.next(data.results);
            this.count.next(data.count);
          }
        },
        error: (error) => {
          return throwError(() => error);
        },
      });
  }
  subscribe(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUserUrl}${SUBSCRIBE_URL}`, {
      ...data,
    });
  }
  getSubscribers(): Observable<any> {
    return this.http.get<any>(`${this.baseUserUrl}${SUBSCRIBE_URL}`);
  }
}
