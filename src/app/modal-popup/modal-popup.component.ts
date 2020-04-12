import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';



/* Usage example:
  constructor(private modalService: NgbModal, ...) {}

  popup() {
      const modalRef = this.modalService.open(ModalPopupComponent);
      modalRef.componentInstance.title = 'Message title';
      modalRef.componentInstance.content = 'Content';
      modalRef.componentInstance.buttons = [
        {label: 'Cancel', reason: 'CANCELLED', active: false, width: 10, marginLeft: 0},
        {label: 'Confirm', reason: 'CONFIRMED', active: true, width: 10, marginLeft: 2}];
      modalRef.componentInstance.cornerBtnReason = 'CLOSED';
      modalRef.result.catch(reason => console.log(reason));
  }
 */
@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent implements OnInit {
  @Input() title;
  @Input() content;
  @Input() buttons = [
    {label: 'OK', reason: 'OK', active: true, width: 10, marginLeft: 2}
  ];

  @Input() cornerBtnReason = 'CLOSED';
  @Input() spinner: boolean;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  calcTotalWidth() {
    let sum = 0;
    for (const button of this.buttons) {
      sum = sum + button.width + button.marginLeft + 0.1;
    }
    return sum + 'rem';
  }
}

