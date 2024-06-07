import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { authGuard } from './core/guards/auth.guard';
import { noauthGuard } from './core/guards/noauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [noauthGuard] },
  {
    path: '',
    canActivate: [authGuard],
    component: AdminContentComponent,
    loadChildren: () =>
      import(`./admin-content/admin-content.module`).then(
        (module) => module.AdminContentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
