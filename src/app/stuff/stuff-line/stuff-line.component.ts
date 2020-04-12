import {Component, ErrorHandler, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';

@Component({
  selector: 'app-stuff-line',
  templateUrl: './stuff-line.component.html',
  styleUrls: ['./stuff-line.component.scss']
})
export class StuffLineComponent {

  @Input()
  stuffUnit: StuffDto;

  generateQr(id: string) {

  }
}
