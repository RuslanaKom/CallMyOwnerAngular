import {Component, OnInit} from '@angular/core';
import {StuffService} from '../../services/stuff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private id: string;
  ownersDefaultMessage: string;
  message: string;

  constructor(
    private contactService: ContactService,
    private stuffService: StuffService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.stuffService.getDefaultMessage(id).subscribe(response => {
      if (response) {
          this.ownersDefaultMessage = response;
        }
      }
    );
    this.id = id;
  }

  sendMessage() {
    this.contactService.sendMessageToOwner(this.id, this.message)
      .subscribe(() => {
        this.message = null;
        this.popUpConfirmation();
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  popUpConfirmation() {
    const modalRef = this.modalService.open(ModalPopupComponent);
    modalRef.componentInstance.title = 'Your message to item owner has been sent.';
    modalRef.componentInstance.cornerBtnReason = 'CLOSED';
  }
}
