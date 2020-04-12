import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './signin/login-component/login.component';
import {RegistrationComponent} from './signin/registration-component/registration.component';
import {HomePageComponent} from './home-page/home-page-component/home-page.component';
import {StuffListComponent} from './stuff/stuff-list-page/stuff-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'onboard-application', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'stuff', component: StuffListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
