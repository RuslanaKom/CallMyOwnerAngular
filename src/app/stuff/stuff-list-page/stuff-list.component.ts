import {Component, ErrorHandler, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessToken, StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../services/message.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit {

  stuffList: StuffDto[];
  pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  sortDirection = 'ASC';


  constructor(
    private errorHandler: ErrorHandler,
    private activatedRoute: ActivatedRoute,
    private stuffService: StuffService,
    private modalService: NgbModal,
    private router: Router) {
  }

  ngOnInit() {
    this.stuffService.fetchUserStuff(this.pageIndex, this.pageSize, this.sortDirection)
      .subscribe(response => {
          this.stuffList = response;
          console.log(this.stuffList);
        }
      );
    this.stuffService.getStuffCount().subscribe(response =>
      this.length = response);
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

  onChangePage($event: PageEvent) {
    this.stuffService.fetchUserStuff($event.pageIndex, $event.pageSize, this.sortDirection).subscribe(response => {
        if (response) {
          this.stuffList = response;
          this.pageIndex = $event.pageIndex;
          this.pageSize = $event.pageSize;
        }
      }
    );
    return null;
  }

  onSortDirectionChanged($event: string) {
    this.sortDirection = $event;
    this.stuffService.fetchUserStuff(this.pageIndex, this.pageSize, this.sortDirection).subscribe(response => {
          this.stuffList = response;
      }
    );
  }
}
