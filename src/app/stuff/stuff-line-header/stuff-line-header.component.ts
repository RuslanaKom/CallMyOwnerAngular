import {Component, ErrorHandler, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../services/message.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {MatSortable} from '@angular/material/sort';

@Component({
  selector: 'app-stuff-line-header',
  templateUrl: './stuff-line-header.component.html',
  styleUrls: ['./stuff-line-header.component.scss']
})
export class StuffLineHeaderComponent {

  isDefault = true;

  @Output()
  directionChanged: EventEmitter<string> = new EventEmitter<string>();

  changeSortDirection() {
    if (this.isDefault) {
      this.isDefault = false;
    } else {
      this.isDefault = true;
    }
    this.directionChanged.emit(this.isDefault === true ? 'ASC' : 'DESC');
  }

}
