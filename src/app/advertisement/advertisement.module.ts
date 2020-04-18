import {NgModule} from '@angular/core';
import {CommonFunctionalityModule} from '../common/common-functionality.module';
import {CommonModule} from '@angular/common';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ReactiveFormsModule} from '@angular/forms';
import {AdvComponent} from './adv/adv.component';
import {AdvEditComponent} from './adv-edit/adv-edit.component';
import {AdvListComponent} from './adv-list/adv-list.component';

@NgModule({
  entryComponents: [],
  declarations: [
    AdvListComponent, AdvComponent, AdvEditComponent
  ],
  imports: [
    CommonModule,
    CommonFunctionalityModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdvListComponent,
    AdvComponent,
    AdvEditComponent,
  ]
})
export class AdvertisementModule {
}
