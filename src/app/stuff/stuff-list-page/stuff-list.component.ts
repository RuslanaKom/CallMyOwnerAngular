import {Component, ErrorHandler, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessToken, StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit {

  stuffList: StuffDto[];
  accessToken: AccessToken;

  constructor(
    private errorHandler: ErrorHandler,
    private activatedRoute: ActivatedRoute,
    private stuffService: StuffService,
    private modalService: NgbModal,
    private router: Router) {
  }

  ngOnInit() {
    this.stuffService.fetchUserStuff()
      .subscribe(response => {
          this.stuffList = response;
          console.log(this.stuffList);
        }
      );

  }

  popupQr(stuffUnit: StuffDto) {
    const modalRef = this.modalService.open(ModalPopupComponent);
    modalRef.componentInstance.title = 'QR for ' + stuffUnit.stuffName;
    modalRef.componentInstance.qr = true;
    modalRef.componentInstance.cornerBtnReason = 'CLOSED';
  }

  createNewStuff() {
    this.router.navigate(['item', 0]).then();
  }
}
