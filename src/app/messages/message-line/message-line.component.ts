import {Component, ErrorHandler, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageDto, StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-line',
  templateUrl: './message-line.component.html',
  styleUrls: ['./message-line.component.scss']
})
export class MessageLineComponent {

  @Input()
  message: MessageDto;
}
