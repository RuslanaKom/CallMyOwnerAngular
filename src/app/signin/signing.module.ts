import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginComponent} from './login-component/login.component';
import {RegistrationComponent} from './registration-component/registration.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommonFunctionalityModule} from '../common/common-functionality.module';

@NgModule({
  entryComponents: [],
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonFunctionalityModule
  ],
  providers: [CookieService],
  exports: [LoginComponent, RegistrationComponent]
})
export class SigninModule { }
