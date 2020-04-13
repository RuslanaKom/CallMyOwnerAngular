import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule, SvgIconRegistryService} from 'angular-svg-icon';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {ContactComponent} from './contact-component/contact.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  entryComponents: [],
  declarations: [ContactComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    AngularSvgIconModule,
    CommonFunctionalityModule,
    FormsModule
  ],
  providers: [CookieService, SvgIconRegistryService],
  exports: [ContactComponent]
})

export class ContactModule { }
