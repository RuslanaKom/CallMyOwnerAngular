import {Component, ErrorHandler, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../services/message.service';

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
    private router: Router) {
  }

  ngOnInit() {
    if (this.stuffUnit) {
      this.messageService.newMessagesExist(this.stuffUnit.id).subscribe(result => {
        console.log('AAAAA ' + result);
        this.hasNewMessages = result; }
        );
    }
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

  getMessages(id: string) {
    this.router.navigate(['messages/' + id]);
  }
}
