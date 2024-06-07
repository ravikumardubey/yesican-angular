import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
})
export class AdminContentComponent {
  sideMenuExpanded = true;
  constructor(private adminService: AdminService) {}
  expandSideMenu(value: any) {
    this.sideMenuExpanded = value;
  }
  logout() {
    this.adminService.logout(true);
  }
}
