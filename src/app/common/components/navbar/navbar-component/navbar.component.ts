import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalPopupComponent} from '../../../../modal-popup/modal-popup.component';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  showUser: boolean;
  @Input()
  logoutDirectly = false;

  loggedUserName: string;
  currentLanguage: string;
  languages: ['en', 'lt'];

  constructor(private location: PlatformLocation,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    this.loggedUserName = this.userService.getLoginName();
  }

  confirmLogout() {
    if (this.logoutDirectly) {
      this.userService.clearAuthCookie();
      this.userService.goToLoginPage();
      return;
    }

    const modalRef = this.modalService.open(ModalPopupComponent, {windowClass: 'cancel-confirm-modal'});
    modalRef.componentInstance.title = 'Log out';
    modalRef.componentInstance.content = 'Log out user' + this.loggedUserName;
    modalRef.componentInstance.buttons = [
      // tslint:disable-next-line:max-line-length
      {label: 'YES', reason: 'CONFIRMED', active: false, width: 10, marginLeft: 0},
      // tslint:disable-next-line:max-line-length
      {label: 'NO', reason: 'CANCELLED', active: true, width: 10, marginLeft: 2}];
    modalRef.componentInstance.cornerBtnReason = 'CLOSED';
    modalRef.result.catch(reason => {
      if (reason === 'CONFIRMED') {
        this.onLogout();
      }
    });
  }

  getLanguageHref(language: string) {
    if (language === 'en') {
      return this.router.url;
    }
    return this.location.getBaseHrefFromDOM() + language + this.router.url;
  }

  onLogout() {
    console.log('Logging out with: ', this.loggedUserName);
    this.userService.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
