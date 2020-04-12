import { Component, OnInit } from '@angular/core';

import {UserService} from '../../services/user.service';
import {User} from '../../models/generated';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

}
