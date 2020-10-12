import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginComponent} from './login-component/login.component';
import {RegistrationComponent} from './registration-component/registration.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {TokenComponent} from './token-component/token.component';
import {ConfirmComponent} from './confirm-component/confirm.component';

@NgModule({
  entryComponents: [],
  declarations: [LoginComponent, RegistrationComponent, TokenComponent, ConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonFunctionalityModule
  ],
  providers: [CookieService],
  exports: [LoginComponent, RegistrationComponent, TokenComponent, ConfirmComponent]
})
export class SigninModule { }
