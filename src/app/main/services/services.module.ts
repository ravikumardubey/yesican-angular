import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { AstroClinicComponent } from './astro-clinic/astro-clinic.component';
import { YourIssuesOurRemedyComponent } from './your-issues-our-remedy/your-issues-our-remedy.component';
import { OnlineClassesComponent } from './online-classes/online-classes.component';

@NgModule({
  declarations: [
    ServicesComponent,
    MentorshipComponent,
    AstroClinicComponent,
    YourIssuesOurRemedyComponent,
    OnlineClassesComponent,
  ],
  imports: [CommonModule, ServicesRoutingModule, PageTitleComponent],
})
export class ServicesModule {}
