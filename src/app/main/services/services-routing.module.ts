import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { AstroClinicComponent } from './astro-clinic/astro-clinic.component';
import { YourIssuesOurRemedyComponent } from './your-issues-our-remedy/your-issues-our-remedy.component';
import { OnlineClassesComponent } from './online-classes/online-classes.component';

const routes: Routes = [
  { path: '', redirectTo: 'mentorship', pathMatch: 'full' },
  { path: 'mentorship', component: MentorshipComponent },
  { path: 'astro-clinic', component: AstroClinicComponent },
  { path: 'your-issues-our-remedy', component: YourIssuesOurRemedyComponent },
  { path: 'online-classes', component: OnlineClassesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
