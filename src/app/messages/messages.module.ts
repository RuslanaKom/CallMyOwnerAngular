import {NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule, SvgIconRegistryService} from 'angular-svg-icon';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {MessagesComponent} from './messages-component/messages.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MessageLineComponent} from './message-line/message-line.component';
import {JwPaginationModule} from 'jw-angular-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  entryComponents: [],
  declarations: [MessagesComponent, MessageLineComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    AngularSvgIconModule,
    CommonFunctionalityModule,
    FormsModule,
    CommonModule,
    JwPaginationModule,
    MatPaginatorModule
  ],
  providers: [CookieService, SvgIconRegistryService],
  exports: [MessagesComponent, MessageLineComponent]
})

export class MessagesModule { }
