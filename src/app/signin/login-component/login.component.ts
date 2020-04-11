import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../modal-popup/modal-popup.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  baseHref: string;

  username: string;
  password: string;
  submitted: boolean;

  constructor(location: PlatformLocation,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
    this.baseHref = location.getBaseHrefFromDOM();
  }

  login() {
    this.submitted = true;
    this.userService.clearAuthCookie();
    this.userService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error occurred when login', error);
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
    modalRef.componentInstance.title = 'Login error';
    modalRef.componentInstance.content = 'A problem with the identification occurred. ' +
      'There may be several reasons why it happened. ' +
      'Please try again or contact our support for more information.';
  }

  register() {
    this.router.navigate(['/registration']);
  }
}
