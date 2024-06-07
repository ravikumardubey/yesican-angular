import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { MENU } from './menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sideMenuExpanded = true;
  @Output() sideMenuExpand = new EventEmitter<any>();
  menuItems = MENU;
  constructor(private adminService: AdminService, private router: Router) {
    this.adminService.showMobileSideNav.subscribe((res) => {
      this.sideMenuExpanded = res;
      this.sideMenuExpand.emit(this.sideMenuExpanded);
    });
  }
  ngOnInit(): void {
    this.expandSideMenu();
  }
  toggleMenu(item: any) {
    if (item.subItems) {
      this.sideMenuExpanded = true;
      this.sideMenuExpand.emit(this.sideMenuExpanded);
      this.menuItems.filter((res) => {
        if (item.id === res.id) {
          res.expand = !res.expand;
        }
      });
    } else {
      this.router.navigate([item.link]);
    }
  }
  expandSideMenu() {
    this.sideMenuExpanded = !this.sideMenuExpanded;
    this.adminService.showMobileSideNav.next(this.sideMenuExpanded);
    this.sideMenuExpand.emit(this.sideMenuExpanded);
  }
  SidebarHide() {
    this.sideMenuExpanded = false;
    this.adminService.showMobileSideNav.next(false);
    this.sideMenuExpand.emit(false);
  }

  logout() {
    this.adminService.logout(true);
  }
}
