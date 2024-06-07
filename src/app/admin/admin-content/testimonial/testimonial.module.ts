import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialRoutingModule } from './testimonial-routing.module';
import { TestimonialComponent } from './testimonial.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestimonialComponent],
  imports: [CommonModule, TestimonialRoutingModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialModule {}
