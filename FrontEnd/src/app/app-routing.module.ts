import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { ContactoComponent } from './public/contacto/contacto.component';
import { CursosComponent } from './public/cursos/cursos.component';
import { AuthTutorGuard } from './helpers/auth-tutor.guard';
import { AuthMonitorGuard } from './helpers/auth-monitor.guard';
import { AuthAdminGuard } from './helpers/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'tutor',
    loadChildren: () =>
      import('./private/tutor/tutor.module').then((m) => m.TutorModule),
    canActivate: [AuthTutorGuard],
    canActivateChild: [AuthTutorGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./private/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthAdminGuard],
    canActivateChild: [AuthAdminGuard],
  },
  {
    path: 'monitor',
    loadChildren: () =>
      import('./private/monitor/monitor.module').then((m) => m.MonitorModule),
    canActivate: [AuthMonitorGuard],
    canActivateChild: [AuthMonitorGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
