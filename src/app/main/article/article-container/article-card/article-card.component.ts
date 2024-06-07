import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent {
  @Input() article!: Article;
  constructor(private router: Router) {}
  openArticleDetailPage(id: any) {
    this.router.navigate(['/article/' + id]);
  }
}
