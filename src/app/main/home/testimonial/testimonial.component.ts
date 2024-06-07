import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgbCarousel, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Testimonial } from 'src/app/core/models/testimonial.model';
import { TestimonialService } from 'src/app/core/services/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  list: Testimonial[] = [];
  testimonialSubscription: Subscription;
  @ViewChild('carousel') carousel!: NgbCarousel;
  constructor(private testimonialService: TestimonialService) {
    this.testimonialSubscription =
      this.testimonialService.testimonial$.subscribe((res) => {
        this.list = res;
      });
  }
  ngOnInit(): void {
    this.testimonialService.getAllTestimonial();
  }
  ngOnDestroy(): void {
    if (this.testimonialSubscription) {
      this.testimonialSubscription.unsubscribe();
    }
  }
  onSlide(e: NgbSlideEvent) {
    this.currentIndex = parseInt(e.current);
  }
  next() {
    this.carousel.next();
    this.carousel.cycle();
  }
  previous() {
    this.carousel.prev();
    this.carousel.cycle();
  }
  updateIndex(e: number) {
    this.carousel.select(e.toString());
    this.currentIndex = e;
    this.carousel.pause();
  }
  getActiveIndex(id: any): number {
    if (id) {
      return parseInt(id);
    }
    return 0;
  }
}
