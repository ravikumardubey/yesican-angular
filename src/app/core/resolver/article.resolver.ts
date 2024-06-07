import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError, mergeMap, of, take } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { EnvironmentService } from '../services/environment.service';
import { Article } from '../models/article.model';
import { SharedService } from '../services/shared.service';

export const ArticleResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const articleService = inject(ArticleService);
  const metaService = inject(Meta);
  const title = inject(Title);
  const router = inject(Router);
  const envService = inject(EnvironmentService);
  const sharedService = inject(SharedService);
  const articleId = route.params['id'];
  return articleService.getArticleById(articleId).pipe(
    take(1),
    mergeMap((article) => {
      let articleData = new Article(article);
      if (article) {
        title.setTitle('Yes I Can' + ' | ' + articleData.title);
        metaService.updateTag({
          property: 'og:image',
          content: articleData.featuredImageUrl,
        });
        metaService.updateTag({
          name: 'title',
          content: articleData.title,
        });
        metaService.updateTag({
          name: 'description',
          content: '',
        });
        metaService.updateTag({
          name: 'keywords',
          content: articleData?.tagDetail.toString(),
        });

        metaService.updateTag({
          property: 'og:title',
          content: articleData.title,
        });
        metaService.updateTag({
          property: 'og:description',
          content: '',
        });
        metaService.updateTag({
          property: 'og:url',
          content: `${envService.getValue('appBaseUrl')}${router.url}`,
        });
        return of(articleData);
      } else {
        return EMPTY;
      }
    }),
    catchError((error) => {
      if (error.error.detail === 'Not found.') {
        sharedService.showErrorNotification('Article Not Found');
        router.navigate(['/article/published']);
      }
      return EMPTY;
    })
  );
};
