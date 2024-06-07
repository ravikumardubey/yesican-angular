import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContentRoutingModule } from './admin-content-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminContentRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminContentModule {}
