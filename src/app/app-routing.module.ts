import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './signin/login-component/login.component';
import {RegistrationComponent} from './signin/registration-component/registration.component';
import {HomePageComponent} from './home-page/home-page-component/home-page.component';
import {StuffListComponent} from './stuff/stuff-list-page/stuff-list.component';
import {StuffEditComponent} from './stuff/stuff-edit/stuff-edit.component';
import {ContactComponent} from './contact-owner/contact-component/contact.component';


const routes: Routes = [
  {path: '', redirectTo: 'onboard-application', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'stuff', component: StuffListComponent},
  {path: 'item/:id', component: StuffEditComponent},
  {path: 'contact/:id', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
