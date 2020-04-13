import {NgModule} from '@angular/core';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {StuffListComponent} from './stuff-list-page/stuff-list.component';
import {CommonModule} from '@angular/common';
import {StuffLineComponent} from './stuff-line/stuff-line.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {StuffEditComponent} from './stuff-edit/stuff-edit.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  entryComponents: [],
  declarations: [
    StuffListComponent, StuffLineComponent, StuffEditComponent
  ],
  imports: [
    CommonModule,
    CommonFunctionalityModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    StuffListComponent,
    StuffLineComponent,
    StuffEditComponent,
  ]
})
export class StuffModule {
}
