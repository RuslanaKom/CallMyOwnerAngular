import {Component, OnInit} from '@angular/core';
import {StuffService} from '../../services/stuff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  id: string;
  ownersDefaultMessage: string;
  message: string;
  notFound: boolean;

  constructor(
    private contactService: ContactService,
    private stuffService: StuffService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== '0' ) {
      this.stuffService.getDefaultMessage(id).subscribe(response => {
          if (response) {
            this.ownersDefaultMessage = response;
          }
        }
      );
      this.id = id;
    } else {
      this.notFound = true;
    }
  }

  sendMessage() {
    this.contactService.sendMessageToOwner(this.id, this.message)
      .subscribe(() => {
          this.message = null;
          this.popUpConfirmation();
        },
        error => {
          console.log(error);
          this.showErrorPopUp(error);
        },
      );
  }

  cancel() {
    this.router.navigate(['/']);
  }

  popUpConfirmation() {
    const modalRef = this.modalService.open(ModalPopupComponent);
    modalRef.componentInstance.title = 'Your message to item owner has been sent.';
    modalRef.componentInstance.cornerBtnReason = 'CLOSED';
  }

  private showErrorPopUp(error: HttpErrorResponse) {
    console.log(error);
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Cannot send the message.';
    modalRef.componentInstance.content = error.error;
  }

}
