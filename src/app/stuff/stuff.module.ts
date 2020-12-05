import {NgModule} from '@angular/core';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {StuffListComponent} from './stuff-list-page/stuff-list.component';
import {CommonModule} from '@angular/common';
import {StuffLineComponent} from './stuff-line/stuff-line.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {StuffEditComponent} from './stuff-edit/stuff-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortHeader, MatSortModule} from '@angular/material/sort';
import {StuffLineHeaderComponent} from './stuff-line-header/stuff-line-header.component';

@NgModule({
  entryComponents: [],
  declarations: [
    StuffListComponent, StuffLineComponent, StuffEditComponent, StuffLineHeaderComponent
  ],
  imports: [
    CommonModule,
    CommonFunctionalityModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ],
  exports: [
    StuffListComponent,
    StuffLineComponent,
    StuffEditComponent,
    StuffLineHeaderComponent
  ]
})
export class StuffModule {
}
