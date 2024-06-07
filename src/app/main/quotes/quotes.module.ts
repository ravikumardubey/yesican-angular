import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { PageTitleComponent } from '../page-title/page-title.component';

@NgModule({
  declarations: [QuotesComponent],
  imports: [CommonModule, QuotesRoutingModule, PageTitleComponent],
})
export class QuotesModule {}
