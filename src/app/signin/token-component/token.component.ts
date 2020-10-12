import {Component} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessToken} from '../../models/generated';

@Component({
  selector: 'app-login',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {

  accessToken: AccessToken;

  constructor(location: PlatformLocation,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    this.accessToken = {
      accessToken: token,
      tokenType: 'Bearer'
    };
    this.userService.setTokeObject(this.accessToken);
    this.router.navigate(['stuff']);
  }
}
