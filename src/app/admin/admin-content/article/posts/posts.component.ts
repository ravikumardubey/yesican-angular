import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  count!: number;
  page: number = 1;
  articleSubscription: Subscription;
  countSubscription: Subscription;
  searchText = '';
  isSearched = false;
  @ViewChild('confirmationModal')
  private modalComponent!: ConfirmationModalComponent;
  selectedId: any;
  constructor(private articleService: ArticleService, private router: Router) {
    this.articleSubscription = this.articleService.articles$.subscribe(
      (articles) => {
        this.articles = articles;
      }
    );
    this.countSubscription = this.articleService.count.subscribe((res) => {
      this.count = res;
    });
  }
  ngOnInit(): void {
    this.articleService.getArticles();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
  searchArticles() {
    if (this.searchText) {
      this.articleService.searchQuery = this.searchText;
      this.articleService.getArticles();
      this.isSearched = true;
    }
  }
  clearSearch() {
    this.searchText = '';
    this.articleService.searchQuery = '';
    this.articleService.getArticles();
    this.isSearched = false;
  }
  selectPage(page: number) {
    this.page = page;
    if (page) {
      this.articleService.getArticles(this.page.toString());
    }
  }
  get showLoading(): boolean {
    return this.articleService.showLoading.value;
  }
  checkAllCheckBox(ev: any) {
    this.articles.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.articles && this.articles.length
      ? this.articles.every((p) => p.checked)
      : false;
  }
  openArticleEdit(id: any) {
    this.router.navigate(['/admin/articles/edit/' + id]);
  }
  async openModal(id: any) {
    this.selectedId = id;
    return await this.modalComponent.open();
  }

  getConfirmationValue(value: any) {
    if (this.selectedId) {
      this.deleteArticle(this.selectedId);
    }
  }
  deleteArticle(id: any) {
    this.articleService.deleteArticle(id);
  }
  getStatus(data: Article): string {
    return data.isPublished
      ? 'Published'
      : data.isUpcoming
      ? 'Upcoming'
      : 'Draft';
  }
  updateStatus(id: number, status: string) {
    let data: any = {};
    data['is_published'] = status === 'Published';
    data['is_upcoming'] = status === 'Upcoming';
    if (status === 'Draft') {
      data['is_published'] = false;
      data['is_upcoming'] = false;
    }
    this.articleService
      .updateArticle(id.toString(), { ...data })
      .subscribe((res) => {
        if (res) {
          this.articles.filter((article) => {
            if (article.id === id) {
              article.isPublished = data.is_published;
              article.isUpcoming = data.is_upcoming;
            }
          });
        }
      });
  }
}
