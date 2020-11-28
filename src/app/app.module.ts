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
import {MessagesModule} from './messages/messages.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  entryComponents: [ModalPopupComponent],
  declarations: [
    AppComponent,
    ModalPopupComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CommonFunctionalityModule,
    HomePageModule,
    SigninModule,
    StuffModule,
    ContactModule,
    MessagesModule,
    AdvertisementModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
