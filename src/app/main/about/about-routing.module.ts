import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademyComponent } from './academy/academy.component';
import { FounderComponent } from './founder/founder.component';

const routes: Routes = [
  { path: '', redirectTo: 'academy', pathMatch: 'full' },
  { path: 'academy', component: AcademyComponent },
  { path: 'founder', component: FounderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
