import {NgModule} from '@angular/core';
import {SsnFormatPipe} from './pipes/ssn.format.pipe';
import {NumericDirective} from './directives/numeric.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar-component/navbar.component';
import {AngularSvgIconModule} from 'angular-svg-icon';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    AngularSvgIconModule,
  ],
  declarations: [
    SsnFormatPipe,
    NumericDirective,
    SpinnerComponent,
    NavbarComponent
  ],
  exports: [
    SsnFormatPipe,
    NumericDirective,
    SpinnerComponent,
    NavbarComponent,
  ]
})
export class CommonFunctionalityModule {}
