import {Component, ErrorHandler, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../services/message.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {RouteMessagesService} from '../../services/route.messages.service';
import {RouteStuffEditService} from '../../services/route.stuffedit.service';

@Component({
  selector: 'app-stuff-line',
  templateUrl: './stuff-line.component.html',
  styleUrls: ['./stuff-line.component.scss']
})
export class StuffLineComponent implements OnInit {

  @Input()
  stuffUnit: StuffDto;

  @Output()
  popupGenerated: EventEmitter<StuffDto> = new EventEmitter<StuffDto>();

  hasNewMessages: boolean;

  constructor(
    private stuffService: StuffService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private routeMessagesService: RouteMessagesService,
    private router: Router,
    private routeStuffEditService: RouteStuffEditService) {
  }

  ngOnInit() {
    if (this.stuffUnit) {
      this.messageService.newMessagesExist(this.stuffUnit.id).subscribe(result => {
          this.hasNewMessages = result;
        }
      );
    }
  }

  generateQr(id: string) {
    console.log('qr generation');
    this.stuffService.generateQr(id).subscribe(() => this.popupGenerated.emit(this.stuffUnit));
  }

  editStuff(id: string) {
    this.routeStuffEditService.$stuffId.next(id);
    this.router.navigate(['item']);
  }

  removeItem() {
    this.showConfirmationPopUp();
  }

  getMessages(id: string) {
    this.routeMessagesService.$stuffId.next(id);
    this.routeMessagesService.$stuffName.next(this.stuffUnit.stuffName);
    this.router.navigate(['messages']);
  }

  private showConfirmationPopUp() {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.content = 'Are you sure you want to delete ' + this.stuffUnit.stuffName + ' and all messages related to it?';
    modalRef.componentInstance.buttons = [
      {label: 'YES', reason: 'CONFIRMED', active: false, width: 10, marginLeft: 0},
      {label: 'NO', reason: 'CANCELLED', active: true, width: 10, marginLeft: 2}];
    modalRef.componentInstance.cornerBtnReason = 'CLOSED';
    modalRef.result.catch(reason => {
      console.log('REASON ' + reason);
      if (reason === 'CONFIRMED') {
        this.stuffService.deleteItem(this.stuffUnit.id).subscribe(() => {
          location.reload();
        });
      }
    });
  }
}
