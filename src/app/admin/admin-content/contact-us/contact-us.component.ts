import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/core/models/contactus.model';
import { ContactUsService } from 'src/app/core/services/contact-us.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit, OnDestroy {
  contactus: Contact[] = [];
  contactSubscription: Subscription;
  countSubscription: Subscription;
  count = 1;
  page = 1;
  constructor(
    private contactService: ContactUsService,
    private sharedService: SharedService
  ) {
    this.contactSubscription = this.contactService.contactus$.subscribe(
      (res) => {
        this.contactus = res;
      }
    );
    this.countSubscription = this.contactService.count.subscribe((res) => {
      this.count = res;
    });
  }
  ngOnInit(): void {
    this.contactService.getAllContactus();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }
  checkAllCheckBox(ev: any) {
    this.contactus.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.contactus && this.contactus.length
      ? this.contactus.every((p) => p.checked)
      : false;
  }
  selectPage(page: number) {
    this.page = page;
    this.contactService.getAllContactus(this.page.toString());
  }
  get showLoading(): boolean {
    return this.contactService.showLoading.value;
  }
  deleteContactus(id: number) {
    this.contactService.deleteContactus(id.toString()).subscribe(() => {
      this.contactus = this.contactus.filter((item) => item.id !== id);
      this.sharedService.showSuccessNotification('Success!');
    });
  }
}
