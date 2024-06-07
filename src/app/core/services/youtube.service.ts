import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { Youtube } from '../models/youtube.model';
import { YOUTUBE_DETAIL, YOUTUBE_LIST } from '../constants/api.constants';
import { PaginatedData } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  youtubeVideos$ = new BehaviorSubject<any>('');
  count = new BehaviorSubject<number>(1);
  youtubeVideosNextPage = '';
  showLoading = new BehaviorSubject<boolean>(true);
  constructor(
    public http: HttpClient,
    private environmentService: EnvironmentService
  ) {}
  createYoutubeVideo(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${YOUTUBE_LIST}`, { ...data });
  }
  getYoutubeVideos(searchQuery = ''): Observable<any> {
    let params = {
      search: searchQuery,
    };
    return this.http.get<any>(`${this.baseUserUrl}${YOUTUBE_LIST}`, {
      params,
    });
  }

  getAllYoutubeVideos(page = '1'): void {
    if (this.count.getValue() <= 12 && page !== '1') {
      page = '1';
    }
    let params = {
      page: page,
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${YOUTUBE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Youtube,
            });
            this.showLoading.next(false);
            this.youtubeVideos$.next(data.results);
            this.count.next(data.count);
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }
  getAllYoutubeVideosForHome(loadMore = false): void {
    this.showLoading.next(true);
    let params = {
      page: loadMore ? this.youtubeVideosNextPage : '1',
      per_page: 12,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${YOUTUBE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: Youtube,
            });
            if (loadMore) {
              this.youtubeVideos$.next([
                ...this.youtubeVideos$.getValue(),
                ...data.results,
              ]);
            } else {
              this.youtubeVideos$.next(data.results);
            }
            this.showLoading.next(false);
            this.youtubeVideosNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }

  updateYoutubeVideo(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUserUrl}${YOUTUBE_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
  deleteYoutubeVideo(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${YOUTUBE_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
}
