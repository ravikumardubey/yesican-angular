import { Component, OnDestroy, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { SharedService } from 'src/app/core/services/shared.service';
import { SubscriberService } from 'src/app/core/services/subscriber.service';
import { Subscription } from 'rxjs';
import { Subscriber } from 'src/app/core/models/subscriber.model';
@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
})
export class SubscribersComponent implements OnInit, OnDestroy {
  subscribers: Subscriber[] = [];
  showLoading = true;
  count!: number;
  page: number = 1;
  subscribersSubscription!: Subscription;
  countSubscription!: Subscription;
  constructor(
    private subscriberService: SubscriberService,
    private clipboard: Clipboard,
    private sharedService: SharedService
  ) {
    this.subscribersSubscription =
      this.subscriberService.subscribers$.subscribe((res) => {
        if (res.length) {
          this.subscribers = res;
          this.showLoading = false;
        }
      });
    this.countSubscription = this.subscriberService.count.subscribe((res) => {
      this.count = res;
    });
  }
  ngOnInit(): void {
    this.subscriberService.getAllSubscribers();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.subscribersSubscription) {
      this.subscribersSubscription.unsubscribe();
    }
  }
  selectPage(page: number) {
    this.page = page;
    if (page) {
      this.showLoading = true;
      this.subscriberService.getAllSubscribers(this.page.toString());
    }
  }
  checkAllCheckBox(ev: any) {
    this.subscribers.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.subscribers && this.subscribers.length
      ? this.subscribers.every((p) => p.checked)
      : false;
  }
  copyToClipboard() {
    const emailArray = this.subscribers.map((item) => item.email);
    const result = emailArray.join(', ');
    this.clipboard.copy(result);
    this.sharedService.showSuccessNotification('Email List Copied!');
  }
}
