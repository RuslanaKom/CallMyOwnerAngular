import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '/',
    loadChildren: () => import('./home-page/home-page-component/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('./signin/login-component/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registration',
    loadChildren: () => import('./signin/registration-component/registration.component').then(m => m.RegistrationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
