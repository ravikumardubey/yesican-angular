import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Magazine } from 'src/app/core/models/magazine.model';
import { MagazineService } from 'src/app/core/services/magazine.service';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss'],
})
export class MagazineComponent implements OnInit, OnDestroy {
  magazines: Magazine[] = [];
  magazineSubscription: Subscription;

  constructor(private magazineService: MagazineService) {
    this.magazineSubscription = this.magazineService.magazines$.subscribe(
      (magazines) => {
        this.magazines = magazines;
      }
    );
  }
  ngOnInit(): void {
    this.magazineService.getAllMagazinesForHome();
  }
  ngOnDestroy(): void {
    if (this.magazineSubscription) {
      this.magazineSubscription.unsubscribe();
    }
  }

  get hasNextPage(): boolean {
    return !!this.magazineService.MagazineNextPage;
  }
  get showLoading(): boolean {
    return this.magazineService.showLoading;
  }

  loadMore() {
    this.magazineService.getAllMagazinesForHome(true);
  }
}
