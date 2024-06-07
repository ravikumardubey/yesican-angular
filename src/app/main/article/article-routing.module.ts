import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleResolver } from 'src/app/core/resolver/article.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'published', pathMatch: 'full' },
  {
    path: 'published',
    component: ArticleContainerComponent,
    data: { page: 'published' },
  },
  {
    path: 'upcoming',
    component: ArticleContainerComponent,
    data: { page: 'upcoming' },
  },
  {
    path: ':id',
    component: ArticleDetailComponent,
    resolve: { Article: ArticleResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
