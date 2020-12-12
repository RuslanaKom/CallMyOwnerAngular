import {Component, ErrorHandler, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessToken, StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PageEvent} from '@angular/material/paginator';
import {RouteStuffEditService} from '../../services/route.stuffedit.service';

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
  stuffName = '';


  constructor(
    private errorHandler: ErrorHandler,
    private activatedRoute: ActivatedRoute,
    private stuffService: StuffService,
    private modalService: NgbModal,
    private router: Router,
    private routeStuffEditService: RouteStuffEditService) {
  }

  ngOnInit() {
    this.stuffService.fetchUserStuff(this.pageIndex, this.pageSize, this.sortDirection, this.stuffName)
      .subscribe(response => {
          this.stuffList = response.content;
          this.length = response.totalElements;
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
    this.routeStuffEditService.$stuffId.next('0');
    this.router.navigate(['item']);
  }

  onChangePage($event: PageEvent) {
    this.stuffService.fetchUserStuff($event.pageIndex, $event.pageSize, this.sortDirection, this.stuffName).subscribe(response => {
        if (response) {
          this.stuffList = response.content;
          this.pageIndex = $event.pageIndex;
          this.pageSize = $event.pageSize;
          this.length = response.totalElements;
        }
      }
    );
    return null;
  }

  onSortDirectionChanged($event: string) {
    this.sortDirection = $event;
    this.stuffService.fetchUserStuff(this.pageIndex, this.pageSize, this.sortDirection, this.stuffName).subscribe(response => {
        console.log('resp ' + response.content);
        this.stuffList = response.content;
        this.length = response.totalElements;
      }
    );
  }

  onStuffNameEntered() {
    this.stuffService.fetchUserStuff(this.pageIndex, this.pageSize, this.sortDirection, this.stuffName).subscribe(response => {
        console.log('resp ' + response.content);
        this.stuffList = response.content;
        this.length = response.totalElements;
      }
    );
  }
}
