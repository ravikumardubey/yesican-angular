import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { PaginatedData } from '../models/pagination.model';
import { ImageModel } from '../models/gallery.model';
import { IMAGE_DETAIL, IMAGE_LIST } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;
  images$ = new BehaviorSubject<any>('');
  imagesNextPage = '';
  showLoading = new BehaviorSubject<boolean>(true);
  selectedCategory = new BehaviorSubject<any>('');
  constructor(
    private environmentService: EnvironmentService,
    private http: HttpClient
  ) {}

  getImages(loadMore = false): void {
    const params = {
      page: loadMore ? this.imagesNextPage || '1' : '1',
      per_page: 12,
      category__id: this.selectedCategory.value,
    };
    this.http
      .get<any>(`${this.baseUserUrl}${IMAGE_LIST}`, { params })
      .subscribe({
        next: (res) => {
          if (res) {
            const data = new PaginatedData({
              ...res,
              resultsModel: ImageModel,
            });
            if (loadMore) {
              this.images$.next([...this.images$.value, ...data.results]);
            } else {
              this.images$.next(data.results);
            }
            this.showLoading.next(false);
            this.imagesNextPage = data.next ? `${data.next}` : '';
          }
        },
        error: (error) => {
          this.showLoading.next(false);
          return throwError(() => error);
        },
      });
  }

  createImage(data: any): Observable<any> {
    return this.http.post(`${this.baseUserUrl}${IMAGE_LIST}`, { ...data });
  }
  deleteImage(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUserUrl}${IMAGE_DETAIL}`.replace(`:id`, `${id}`)
    );
  }
  updateImage(id: string, data: any): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUserUrl}${IMAGE_DETAIL}`.replace(`:id`, `${id}`),
      { ...data }
    );
  }
}
