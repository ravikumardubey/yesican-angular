import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksCreateEditComponent } from './books-create-edit/books-create-edit.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'create', component: BooksCreateEditComponent },
  {
    path: 'edit/:id',
    component: BooksCreateEditComponent,
    data: {
      isEditPage: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
