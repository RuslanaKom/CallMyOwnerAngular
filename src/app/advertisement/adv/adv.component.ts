import {Component, ErrorHandler, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvDto, StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';

@Component({
  selector: 'app-adv',
  templateUrl: './adv.component.html',
  styleUrls: ['./adv.component.scss']
})
export class AdvComponent {

  @Input()
  adv: AdvDto;
}
