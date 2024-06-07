import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { PageTitleComponent } from '../page-title/page-title.component';
import { AcademyComponent } from './academy/academy.component';
import { FounderComponent } from './founder/founder.component';
import { SocialLinksComponent } from 'src/app/social-links/social-links.component';

@NgModule({
  declarations: [AcademyComponent, FounderComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    PageTitleComponent,
    SocialLinksComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutModule {}
