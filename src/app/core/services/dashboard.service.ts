import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD_INSIGHTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;

  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}

  getDashbaordInsights(): Observable<any> {
    return this.http.get<any>(`${this.baseUserUrl}${DASHBOARD_INSIGHTS}`);
  }
}
