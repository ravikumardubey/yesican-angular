import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { LOGIN_URL, REFRESH_URL } from '../constants/api.constants';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  currentIPAddress$ = new BehaviorSubject<string>('');
  error = '';
  showMobileSideNav = new BehaviorSubject<boolean>(true);
  constructor(
    public http: HttpClient,
    private environmentService: EnvironmentService,
    private cookieService: SsrCookieService
  ) {}
  getIPAddress(): void {
    this.http.get<any>('https://jsonip.com/').subscribe({
      next: (data) => {
        this.currentIPAddress$.next((data || {}).ip);
      },
    });
  }
  authSuccess(tokenData: any): void {
    const oneDayInSeconds = 24 * 60 * 60;
    const expirationDate = new Date(Date.now() + oneDayInSeconds * 1000);
    this.cookieService.set(
      'ysAccess',
      tokenData.access,
      tokenData.access_expiration || expirationDate
    );
    this.cookieService.set(
      'ysRefresh',
      tokenData.refresh,
      tokenData.access_expiration || expirationDate
    );
  }

  login(email: string, password: string): Observable<boolean> {
    let username = email.toLowerCase();
    return this.http
      .post<any>(`${this.baseUserUrl}${LOGIN_URL}`, {
        username,
        password,
      })
      .pipe(
        tap((tokenData) => this.authSuccess(tokenData)),
        map(() => true),
        catchError((error) => {
          if (error.error.non_field_errors) {
            this.error = error.error.non_field_errors;
          } else {
            this.error = 'Something not right, please try again!';
          }
          return of(false);
        })
      );
  }
  refreshToken(): Observable<any> {
    return this.http
      .post<any>(`${this.baseUserUrl}${REFRESH_URL}`, {
        refresh: this.cookieService.get('ysRefresh'),
      })
      .pipe(
        tap((tokenData) => this.authSuccess(tokenData)),
        map((tokenData) => tokenData.access),
        catchError((error) => {
          this.logout(true);
          return throwError(() => error);
        })
      );
  }

  logout(reload = false): void {
    this.cookieService.deleteAll('/');
    if (reload) {
      try {
        timer(500).subscribe(() => window.location.reload());
      } catch (err) {
        console.log(err);
      }
    }
  }
}
