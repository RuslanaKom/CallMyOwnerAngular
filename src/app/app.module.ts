import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonFunctionalityModule} from './common/common-functionality.module';
import {HomePageModule} from './home-page/home-page.module';
import {SigninModule} from './signin/signing.module';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {StuffModule} from './stuff/stuff.module';
import {HttpInterceptorProviders} from './interceptors/http-interceptor-providers';
import {ContactModule} from './contact-owner/contact.module';
import {AdvertisementModule} from './advertisement/advertisement.module';


@NgModule({
  entryComponents: [ModalPopupComponent],
  declarations: [
    AppComponent,
    ModalPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonFunctionalityModule,
    HomePageModule,
    SigninModule,
    StuffModule,
    ContactModule,
    AdvertisementModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
