import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  {
    path: 'articles',
    loadChildren: () =>
      import(`./article/article.module`).then((module) => module.ArticleModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import(`./books/books.module`).then((module) => module.BooksModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import(`./gallery/gallery.module`).then((module) => module.GalleryModule),
  },
  {
    path: 'magazine',
    loadChildren: () =>
      import(`./magazine/magazine.module`).then(
        (module) => module.MagazineModule
      ),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import(`./contact-us/contact-us.module`).then(
        (module) => module.ContactUsModule
      ),
  },
  {
    path: 'testimonial',
    loadChildren: () =>
      import(`./testimonial/testimonial.module`).then(
        (module) => module.TestimonialModule
      ),
  },
  {
    path: 'subscribers',
    loadChildren: () =>
      import(`./subscribers/subscribers.module`).then(
        (module) => module.SubscribersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminContentRoutingModule {}
