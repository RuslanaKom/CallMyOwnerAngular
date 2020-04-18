import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {Router} from '@angular/router';
import {UserAccountDto} from '../../models/generated';

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
    console.log('validate11');
    this.validate = true;
    this.passwordWeak = false;
    this.passwordsNotMatch = false;
    if (!this.passwordMatches()) {
      this.passwordsNotMatch = true;
      return false;
    }
    if (this.isPasswordWeak()) {
      console.log('validate');
      this.passwordWeak = true;
      console.log(this.passwordWeak);
      return false;
    }
    return true;
  }

  register() {
    console.log('1')
    if (!this.validateInput()) {
      console.log('from register')
      return;
    }
    this.submitted = true;
    this.userService.clearAuthCookie();
    this.userService.registerUser(this.userAccountDto).subscribe(
      () => {
        this.router.navigate(['home']);
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
    return this.userAccountDto.password === this.repeatPassword;
  }

  private isPasswordWeak() {
    return !this.userAccountDto.password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,30}');
  }
}
