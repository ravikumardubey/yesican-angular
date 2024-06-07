import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagazineComponent } from './magazine.component';
import { AddMagazineComponent } from './add-magazine/add-magazine.component';

const routes: Routes = [
  { path: '', component: MagazineComponent },
  { path: 'add', component: AddMagazineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagazineRoutingModule {}
