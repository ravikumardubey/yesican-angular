import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { GalleryCategoriesComponent } from './photos/gallery-categories/gallery-categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: 'photos', component: PhotosComponent },
  { path: 'categories', component: GalleryCategoriesComponent },
  { path: 'youtube', component: YoutubeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
