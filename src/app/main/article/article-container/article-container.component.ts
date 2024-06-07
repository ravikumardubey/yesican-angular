import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article, Category } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.scss'],
})
export class ArticleContainerComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  categories: Category[] = [];
  page = '';
  title = '';
  articleSubscription: Subscription;
  categorySubscription: Subscription;
  selectedCategorySubscription: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.articleSubscription = this.articleService.articles$.subscribe(
      (res) => {
        if (res) {
          this.articles = res;
        }
      }
    );
    this.categorySubscription = this.categoryService.categories$.subscribe(
      (res) => {
        this.categories = res;
      }
    );
    this.selectedCategorySubscription =
      this.articleService.selectedCategory.subscribe((res) => {
        if (res) {
          this.categories.filter((category) => {
            if (category.id === res) {
              category.checked = true;
            }
            if (category.id !== res) {
              category.checked = false;
            }
          });
        }
      });
  }
  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];
    if (this.page === 'published') {
      this.title = 'Article - Published';
      this.articleService.selectedStatus.next({
        text: 'is_published',
        value: true,
      });
      this.articleService.getArticlesForHome();
    }
    if (this.page === 'upcoming') {
      this.title = 'Article - Upcoming';
      this.articleService.selectedStatus.next({
        text: 'is_upcoming',
        value: true,
      });
      this.articleService.getArticlesForHome();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.categoryService.getCategoriesForHome();
  }
  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.selectedCategorySubscription) {
      this.selectedCategorySubscription.unsubscribe();
    }
    this.articleService.selectedCategory.next(0);
    this.articleService.showLoading.next(true);
  }
  filterByCategory(id: number) {
    this.articleService.selectedCategory.next(id);
    this.articleService.getArticlesForHome();
  }
  get hasNextPage(): boolean {
    return !!this.articleService.articlesNextPage;
  }
  get showLoading(): boolean {
    return this.articleService.showLoading.value;
  }
  loadMore() {
    this.articleService.getArticlesForHome(true);
  }
}
