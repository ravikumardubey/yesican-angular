import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksContainerComponent } from './books-container/books-container.component';

const routes: Routes = [
  {
    path: '',
    component: BooksContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
