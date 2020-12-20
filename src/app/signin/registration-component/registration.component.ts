import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {Router} from '@angular/router';
import {UserAccountDto} from '../../models/generated';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userAccountDto: UserAccountDto;
  repeatPassword: string;
  validate: boolean;
  submitted: boolean;
  passwordsNotMatch: boolean;
  passwordWeak: boolean;

  constructor(location: PlatformLocation,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userAccountDto = {
      username: null,
      password: null,
      defaultEmail: null,
    };
  }

  validateInput() {
    this.validate = true;
    this.passwordWeak = false;
    this.passwordsNotMatch = false;
    if (!this.passwordMatches()) {
      this.passwordsNotMatch = true;
      return false;
    }
    if (this.isPasswordWeak()) {
      this.passwordWeak = true;
      return false;
    }
    return true;
  }

  register() {
    if (!this.validateInput()) {
      return;
    }
    this.submitted = true;
    this.userService.clearAuthCookie();
    this.userService.registerUser(this.userAccountDto).subscribe(
      () => {
        this.showConfirmationPopUp();
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error occurred during registration', error);
        this.submitted = false;
        this.showErrorPopUp(error);
      },
      () => {
        this.submitted = false;
      });
  }

  private showErrorPopUp(error: HttpErrorResponse) {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Cannot complete registration';
    modalRef.componentInstance.content = error.error;
  }

  private showConfirmationPopUp() {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Confirm your registration';
    modalRef.componentInstance.content = 'Confirmation email has been sent to ' + this.userAccountDto.defaultEmail + '. Please check your inbox and confirm you registration.';
  }

  private passwordMatches() {
    return this.userAccountDto.password === this.repeatPassword;
  }

  private isPasswordWeak() {
    return !this.userAccountDto.password.match(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,30}');
  }
}
