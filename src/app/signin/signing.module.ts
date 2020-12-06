import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginComponent} from './login-component/login.component';
import {RegistrationComponent} from './registration-component/registration.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {TokenComponent} from './token-component/token.component';
import {ConfirmComponent} from './confirm-component/confirm.component';
import {ProfileComponent} from './profile-component/profile.component';
import {AngularSvgIconModule} from 'angular-svg-icon';

@NgModule({
  entryComponents: [],
  declarations: [LoginComponent, RegistrationComponent, TokenComponent, ConfirmComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonFunctionalityModule,
    AngularSvgIconModule
  ],
  providers: [CookieService],
  exports: [LoginComponent, RegistrationComponent, TokenComponent, ConfirmComponent, ProfileComponent]
})
export class SigninModule { }
