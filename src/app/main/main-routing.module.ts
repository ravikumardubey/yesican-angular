import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./home/home.module`).then((module) => module.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import(`./about/about.module`).then((module) => module.AboutModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import(`./services/services.module`).then(
        (module) => module.ServicesModule
      ),
  },
  {
    path: 'books',
    loadChildren: () =>
      import(`./books/books.module`).then((module) => module.BooksModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import(`./contact/contact-us.module`).then(
        (module) => module.ContactUsModule
      ),
  },
  {
    path: 'article',
    loadChildren: () =>
      import(`./article/article.module`).then((module) => module.ArticleModule),
  },
  {
    path: 'vision',
    loadChildren: () =>
      import(`./vision/vision.module`).then((module) => module.VisionModule),
  },
  {
    path: 'quotes',
    loadChildren: () =>
      import(`./quotes/quotes.module`).then((module) => module.QuotesModule),
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
