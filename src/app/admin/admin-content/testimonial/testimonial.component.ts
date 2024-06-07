import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Testimonial } from 'src/app/core/models/testimonial.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { TestimonialService } from 'src/app/core/services/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [];
  testimonialSubscription: Subscription;
  countSubscription: Subscription;
  page = 1;
  count = 1;
  addTestimonial = true;
  error = '';
  newTestimonial: Testimonial = new Testimonial();
  editTestimonial: Testimonial = new Testimonial();
  constructor(
    private testimonialService: TestimonialService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.testimonialSubscription =
      this.testimonialService.testimonial$.subscribe((res) => {
        this.testimonials = res;
      });
    this.countSubscription = this.testimonialService.count.subscribe((res) => {
      this.count = res;
    });
  }
  ngOnInit(): void {
    this.testimonialService.getAllTestimonial();
  }
  ngOnDestroy(): void {
    if (this.countSubscription) {
      this.countSubscription.unsubscribe();
    }
    if (this.testimonialSubscription) {
      this.testimonialSubscription.unsubscribe();
    }
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true, scrollable: true });
  }
  openEditModal(content: any, item: Testimonial) {
    this.editTestimonial = { ...item };
    this.modalService.open(content, { centered: true, scrollable: true });
  }
  checkAllCheckBox(ev: any) {
    this.testimonials.forEach((x) => (x.checked = ev.target.checked));
  }

  isAllCheckBoxChecked() {
    return this.testimonials && this.testimonials.length
      ? this.testimonials.every((p) => p.checked)
      : false;
  }
  get showLoading(): boolean {
    return this.testimonialService.showLoading.value;
  }
  selectPage(page: number) {
    this.page = page;
    this.testimonialService.getAllTestimonial(this.page.toString());
  }
  createNewTestimonial() {
    let data: any = {};
    data['client_name'] = this.newTestimonial.clientName;
    data['client_title'] = this.newTestimonial.clientTitle;
    data['content'] = this.newTestimonial.content;
    this.testimonialService.createTestimonial(data).subscribe(() => {
      this.sharedService.showSuccessNotification('Success!');
      this.testimonialService.getAllTestimonial(this.page.toString());
      this.newTestimonial = new Testimonial();
      this.modalService.dismissAll();
    });
  }
  updateTestimonial() {
    let data: any = {};
    data['client_name'] = this.editTestimonial.clientName;
    data['client_title'] = this.editTestimonial.clientTitle;
    data['content'] = this.editTestimonial.content;
    this.testimonialService
      .updateTestimonial(this.editTestimonial.id.toString(), data)
      .subscribe(() => {
        this.sharedService.showSuccessNotification('Success!');
        this.testimonials.filter((data) => {
          if (data.id === this.editTestimonial.id) {
            data.clientName = this.editTestimonial.clientName;
            data.clientTitle = this.editTestimonial.clientTitle;
            data.content = this.editTestimonial.content;
          }
        });
        this.modalService.dismissAll();
        this.editTestimonial = new Testimonial();
      });
  }
  deleteTestimonial(id: number) {
    this.testimonialService
      .deleteTestimonial(id.toString())
      .subscribe((res) => {
        this.sharedService.showSuccessNotification('Success!');
        this.testimonialService.getAllTestimonial(this.page.toString());
      });
  }
}
