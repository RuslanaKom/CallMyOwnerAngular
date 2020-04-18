import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule, SvgIconRegistryService} from 'angular-svg-icon';
import {HomePageComponent} from './home-page-component/home-page.component';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {AdvertisementModule} from '../advertisement/advertisement.module';


@NgModule({
  entryComponents: [],
  declarations: [HomePageComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    AngularSvgIconModule,
    CommonFunctionalityModule,
    AdvertisementModule
  ],
  providers: [CookieService, SvgIconRegistryService],
  exports: [HomePageComponent]
})

export class HomePageModule { }
