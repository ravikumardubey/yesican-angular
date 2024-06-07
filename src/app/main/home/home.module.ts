import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CountToDirective } from 'src/app/core/directives/count-to.directive';
import { AboutHomeComponent } from './about-home/about-home.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HomeComponent } from './home.component';
import { HomeFounderQuotesComponent } from './home-founder-quotes/home-founder-quotes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { SocialLinksComponent } from 'src/app/social-links/social-links.component';
import { AboutMentorComponent } from './about-mentor/about-mentor.component';
import { HomeBecomeAVolunteerComponent } from './home-become-a-volunteer/home-become-a-volunteer.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeFounderQuotesComponent,
    AboutHomeComponent,
    CountToDirective,
    HomeDashboardComponent,
    TestimonialComponent,
    HomeServicesComponent,
    AboutMentorComponent,
    HomeBecomeAVolunteerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgbModule,
    SocialLinksComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
