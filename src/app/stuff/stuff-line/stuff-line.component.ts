import {Component, ErrorHandler, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';

@Component({
  selector: 'app-stuff-line',
  templateUrl: './stuff-line.component.html',
  styleUrls: ['./stuff-line.component.scss']
})
export class StuffLineComponent {

  @Input()
  stuffUnit: StuffDto;

  @Output()
  popupGenerated: EventEmitter<StuffDto> = new EventEmitter<StuffDto>();

  constructor(
    private stuffService: StuffService,
    private modalService: NgbModal,
    private router: Router) {
  }

  generateQr(id: string) {
    console.log('qr generation');
    this.stuffService.generateQr(id).subscribe(() => this.popupGenerated.emit(this.stuffUnit));
  }

  editStuff(id: string) {
    this.router.navigate(['item', id]).then();
  }

  removeItem(id: string) {
    console.log('remove');
    this.stuffService.deleteItem(id).subscribe(() => {
      console.log('deleted');
      location.reload();
    });
  }
}
