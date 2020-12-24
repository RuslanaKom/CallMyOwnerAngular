import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {Router} from '@angular/router';
import {UserAccountDto} from '../../models/generated';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userAccountDto: UserAccountDto;
  validate: boolean;
  submitted: boolean;

  constructor(location: PlatformLocation,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(response => {
      this.userAccountDto = {
        username: response.username,
        password: null,
        defaultEmail: response.defaultEmail,
      };
    });
  }

  updateProfile() {
    this.submitted = true;
    this.userService.updateUserProfile(this.userAccountDto).subscribe(
      response => {
        if (response.userAccountDto.defaultEmail !== this.userAccountDto.defaultEmail) {
          this.showConfirmationPopUp();
        } else {
          this.showOkPopUp();
        }
        this.userAccountDto = response.userAccountDto;
        this.userService.setTokeObject(response.accessToken);
        console.log('Setting new token ' + response.accessToken);
      },
      error => {
        console.error('Error occurred during profile update', error);
        this.submitted = false;
        this.showErrorPopUp(error);
      },
      () => {
        this.submitted = false;
      });
  }

  private showErrorPopUp(error: HttpErrorResponse)  {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Profile edit error';
    modalRef.componentInstance.content = error.error;
  }

  private showConfirmationPopUp() {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Confirm your email changed.';
    modalRef.componentInstance.content = 'Confirmation email has been sent to ' + this.userAccountDto.defaultEmail + '. Please check your inbox and confirm you registration.';
  }

  private showOkPopUp() {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Your profile data updated successfully.';
  }

  cancel() {
    this.router.navigate(['stuff']);
  }
}
