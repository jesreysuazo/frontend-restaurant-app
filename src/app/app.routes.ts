import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { RoleGuard } from './core/guards/role.guard';
import { VerificationComponent } from './public/verification/verification.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './public/unauthorized/unauthorized.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageMenuComponent } from './admin/manage-menu/manage-menu.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { MenuComponent } from './public/menu/menu.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  {path: 'verify', component: VerificationComponent},
  { path: 'menu', component: MenuComponent }, 
  {path: 'reset-password', component: ForgotPasswordComponent},
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [
      RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent, 
  },
  { path: '**', redirectTo: '' }, 
];
