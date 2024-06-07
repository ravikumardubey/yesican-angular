import { Component } from '@angular/core';
import { Magazine } from 'src/app/core/models/magazine.model';
import { MagazineService } from 'src/app/core/services/magazine.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss'],
})
export class MagazineComponent {
  magazines: Magazine[] = [];
  showLoading = true;
  count!: number;
  page: number = 1;
  magazinesSubscription!: Subscription;
  countSubscription!: Subscription;
  constructor(
    private magazineService: MagazineService,
    private sharedService: SharedService
  ) {
    this.magazinesSubscription = this.magazineService.magazines$.subscribe(
      (res) => {
        if (res) {
          this.magazines = res;
          this.showLoading = false;
        }
      }
    );
    this.countSubscription = this.magazineService.count.subscribe((res) => {
      this.count = res;
    });
  }
  ngOnInit(): void {
    this.magazineService.getAllMagazines();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.magazinesSubscription) {
      this.magazinesSubscription.unsubscribe();
    }
  }
  selectPage(page: number) {
    this.page = page;
    if (page) {
      this.showLoading = true;
      this.magazineService.getAllMagazines(this.page.toString());
    }
  }
  checkAllCheckBox(ev: any) {
    this.magazines.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.magazines && this.magazines.length
      ? this.magazines.every((p) => p.checked)
      : false;
  }
  deleteMagazine(id: any) {
    this.magazineService.deleteMagazine(id).subscribe((res) => {
      this.sharedService.showSuccessNotification('Delete Success!');
      this.magazines = this.magazines.filter((item) => item.id !== id);
    });
  }
}
