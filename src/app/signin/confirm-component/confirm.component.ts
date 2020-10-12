import {Component} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessToken} from '../../models/generated';

@Component({
  selector: 'app-login',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  accessToken: AccessToken;

  constructor(location: PlatformLocation,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.confirmEmail(id).subscribe(
      (response) => {
        console.log(response);
        this.userService.setToken(response);
        this.router.navigate(['stuff']);
      });
  }

  sendConfirmation(id: string){

  }
}
