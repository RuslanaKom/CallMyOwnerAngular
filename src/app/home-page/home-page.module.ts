import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HomePageComponent} from './home-page-component/home-page.component';
import {CommonFunctionalityModule} from '../common/common-functionality.module';


@NgModule({
  entryComponents: [],
  declarations: [HomePageComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    AngularSvgIconModule,
    CommonFunctionalityModule
  ],
  providers: [CookieService],
  exports: [HomePageComponent]
})

export class HomePageModule { }
