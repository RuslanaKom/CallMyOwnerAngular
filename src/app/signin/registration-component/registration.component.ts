import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  username: string;
  email: string;
  password: string;
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
    this.userService.registerUser(this.username, this.password, this.email).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error occurred during registration', error);
        this.submitted = false;
        this.showErrorPopUp();
      },
      () => {
        this.submitted = false;
      });
  }

  private showErrorPopUp() {
    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.spinner = false;
    modalRef.componentInstance.title = 'Sign up error';
    modalRef.componentInstance.content = 'A problem with the identification occurred. ' +
      'There may be several reasons why it happened. ' +
      'Please try again or contact our support for more information.';
  }

  private passwordMatches() {
    return this.password === this.repeatPassword;
  }

  private isPasswordWeak() {
    return this.password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,30}');
  }
}
