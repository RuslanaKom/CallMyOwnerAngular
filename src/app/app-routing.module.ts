import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './signin/login-component/login.component';
import {RegistrationComponent} from './signin/registration-component/registration.component';
import {HomePageComponent} from './home-page/home-page-component/home-page.component';
import {StuffListComponent} from './stuff/stuff-list-page/stuff-list.component';
import {StuffEditComponent} from './stuff/stuff-edit/stuff-edit.component';
import {ContactComponent} from './contact-owner/contact-component/contact.component';
import {TokenComponent} from './signin/token-component/token.component';
import {ConfirmComponent} from './signin/confirm-component/confirm.component';
import {MessagesComponent} from './messages/messages-component/messages.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'auth/:token', component: TokenComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: HomePageComponent},
  {path: 'stuff', component: StuffListComponent},
  {path: 'item', component: StuffEditComponent},
  {path: 'contact/:id', component: ContactComponent},
  {path: 'confirm/:id', component: ConfirmComponent},
  {path: 'messages', component: MessagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
