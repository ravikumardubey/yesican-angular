import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Observable, of, throwError } from 'rxjs';
import { FILE_UPLOAD_PRIVATE_URL } from '../constants/api.constants';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUserUrl = `${this.environmentService.getValue('djangoUrl')}`;

  constructor(
    public http: HttpClient,
    public environmentService: EnvironmentService
  ) {}

  getFileUploadUrl(fileName: any, fileType: any): Observable<any> {
    return this.http.put<any>(`${this.baseUserUrl}${FILE_UPLOAD_PRIVATE_URL}`, {
      file_name: fileName,
      file_type: fileType,
    });
  }
  uploadPublicFile(file: File): Observable<any> {
    return this.getFileUploadUrl(file.name, file.type).pipe(
      mergeMap((res) => {
        const postUrl = res.url;
        const formData: FormData = new FormData();
        for (const [key, value] of Object.entries(res.fields)) {
          const valueData: any = value;
          formData.append(key, valueData);
        }
        formData.append('file', file);
        const fileUuid = res.uuid;
        const fileUrl = res.get_url;
        return this.http
          .post(postUrl, formData, { reportProgress: true, observe: 'events' })
          .pipe(
            map((uploadResponse: HttpEvent<Object>): any => {
              switch (uploadResponse.type) {
                case HttpEventType.Sent:
                  // console.log('Upload started');
                  return { progress: 0, uuid: fileUuid };
                case HttpEventType.DownloadProgress:
                  break;
                case HttpEventType.UploadProgress:
                  let progress = 0;
                  if (uploadResponse.total) {
                    progress = Math.round(
                      (uploadResponse.loaded / uploadResponse.total) * 100
                    );
                  }
                  return { progress, uuid: fileUuid, url: fileUrl };
                case HttpEventType.Response:
                  return {
                    progress: 0,
                    success: true,
                    uuid: fileUuid,
                    url: fileUrl,
                  };
              }
            })
          );
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  uploadFile(file: File | any): Observable<any> {
    const startTime = new Date().getTime();

    return this.getFileUploadUrl(file.name, file.type).pipe(
      mergeMap((res) => {
        const postUrl = res.url;
        const formData: FormData = new FormData();
        for (const [key, value] of Object.entries(res.fields)) {
          const valueData: any = value;
          formData.append(key, valueData);
        }
        formData.append('file', file);
        const fileUuid = res.uuid;
        return this.http
          .post(postUrl, formData, {
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            map((uploadResponse: HttpEvent<Object>): any => {
              switch (uploadResponse.type) {
                case HttpEventType.Sent:
                  // console.log('Upload started');
                  return { progress: 0, uuid: fileUuid };
                case HttpEventType.UploadProgress:
                  let progress = 0;
                  if (uploadResponse.total) {
                    progress = Math.round(
                      (uploadResponse.loaded / uploadResponse.total) * 100
                    );
                  }
                  const currentTime = new Date().getTime();
                  const elapsedTime = (currentTime - startTime) / 1000; // in seconds
                  let remainingTime = Infinity;
                  if (uploadResponse.total && uploadResponse.loaded > 0) {
                    const total = uploadResponse.total;
                    const remainingBytes = total - uploadResponse.loaded;
                    remainingTime =
                      (remainingBytes * elapsedTime) / uploadResponse.loaded;
                  }
                  return { progress, uuid: fileUuid, remainingTime };
                case HttpEventType.Response:
                  return {
                    progress: 100,
                    success: true,
                    uuid: fileUuid,
                    remainingTime: 0,
                  };
              }
            }),
            catchError((error) => {
              console.error('Error uploading file:', error);
              if (error.status === 0) {
                return of({
                  progress: 0,
                  success: false,
                  error: 'Network Error',
                });
              } else {
                return of({
                  progress: 0,
                  success: false,
                  error: error.message,
                });
              }
            }),
            finalize(() => {
              // code to execute when the upload is complete or failed
            })
          );
      }),
      catchError((error) => {
        console.error('Error getting file upload URL:', error);
        return throwError(() => error);
      })
    );
  }
}
