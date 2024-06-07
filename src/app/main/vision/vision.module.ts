import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisionRoutingModule } from './vision-routing.module';
import { VisionComponent } from './vision.component';
import { PageTitleComponent } from '../page-title/page-title.component';

@NgModule({
  declarations: [VisionComponent],
  imports: [CommonModule, VisionRoutingModule, PageTitleComponent],
})
export class VisionModule {}
