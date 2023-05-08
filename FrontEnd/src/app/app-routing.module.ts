import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { ContactoComponent } from './public/contacto/contacto.component';
import { CursosComponent } from './public/cursos/cursos.component';


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
     path: 'tutor', loadChildren:()=>import('./private/tutor/tutor.module').then((m)=>m.TutorModule)
     
   },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
