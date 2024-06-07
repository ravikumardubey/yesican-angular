import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateEditComponent } from './post-create-edit/post-create-edit.component';
import { PostsComponent } from './posts/posts.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'create', component: PostCreateEditComponent },
  {
    path: 'edit/:id',
    component: PostCreateEditComponent,
    data: {
      isEditPage: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
