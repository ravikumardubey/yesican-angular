import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine.component';
import { PageTitleComponent } from '../page-title/page-title.component';

@NgModule({
  declarations: [MagazineComponent],
  imports: [CommonModule, MagazineRoutingModule, PageTitleComponent],
})
export class MagazineModule {}
