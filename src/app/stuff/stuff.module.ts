import {NgModule} from '@angular/core';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {StuffListComponent} from './stuff-list-page/stuff-list.component';
import {CommonModule} from '@angular/common';
import {StuffLineComponent} from './stuff-line/stuff-line.component';
import {AngularSvgIconModule} from 'angular-svg-icon';

@NgModule({
  entryComponents: [],
  declarations: [
    StuffListComponent, StuffLineComponent
  ],
  imports: [
    CommonModule,
    CommonFunctionalityModule,
    AngularSvgIconModule
  ],
  exports: [
    StuffListComponent,
    StuffLineComponent,
  ]
})
export class StuffModule {
}
