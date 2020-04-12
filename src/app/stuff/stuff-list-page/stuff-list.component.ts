import {Component, ErrorHandler, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StuffDto} from '../../models/generated';
import {StuffService} from '../../services/stuff.service';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit {

  stuffList: StuffDto[];

  constructor(
    private errorHandler: ErrorHandler,
    private activatedRoute: ActivatedRoute,
    private stuffService: StuffService) {
  }

  ngOnInit() {
    this.stuffService.fetchUserStuff()
      .subscribe(response => {
          this.stuffList = response;
          console.log(this.stuffList);
        }
      );
  }
}
