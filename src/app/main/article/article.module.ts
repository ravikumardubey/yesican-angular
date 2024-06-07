import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleContainerComponent } from './article-container/article-container.component';
import { ArticleCardComponent } from './article-container/article-card/article-card.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SafeHtmlPipe } from 'src/app/core/pipes/safe-html.pipe';

@NgModule({
  declarations: [
    ArticleContainerComponent,
    ArticleCardComponent,
    ArticleDetailComponent,
    SafeHtmlPipe,
  ],
  imports: [CommonModule, ArticleRoutingModule, PageTitleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleModule {}
