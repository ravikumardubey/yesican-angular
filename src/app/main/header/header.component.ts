import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMobileNavbar = false;
  showMobileSideNav = false;
  @Input() showSideNav = false;
  constructor(private adminService: AdminService) {
    this.adminService.showMobileSideNav.subscribe((res) => {
      this.showMobileSideNav = res;
    });
  }
  toggleMobileNavbar() {
    this.showMobileNavbar = !this.showMobileNavbar;
  }
  closeMobileNavbar() {
    this.showMobileNavbar = false;
  }
  toggleMobileSideNav() {
    this.showMobileSideNav = !this.showMobileSideNav;
    if (this.showMobileSideNav) {
      this.showMobileNavbar = false;
    }
    this.adminService.showMobileSideNav.next(this.showMobileSideNav);
  }
}
