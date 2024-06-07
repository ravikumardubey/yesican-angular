import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';
import * as dayjs from 'dayjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  totalMagazines = 0;
  totalBooks = 0;
  startDate: dayjs.Dayjs = dayjs('1978-01-01');
  successYears = 0;
  totalArticles = 0;
  constructor(private dashboardService: DashboardService) {
    const today = dayjs();
    this.successYears = today.year() - this.startDate.year();
  }

  ngOnInit(): void {
    this.dashboardService.getDashbaordInsights().subscribe((res) => {
      if (res) {
        this.totalArticles = res.blogs_count;
        this.totalBooks = res.books_count;
        this.totalMagazines = res.magazines_count;
      }
    });
  }
  ngOnDestroy(): void {}
}
