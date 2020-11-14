import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/generated';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  private stuffId: string;
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize = 5;
  length = 20; // get call needed to set number of all existing messages

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.stuffId = id;
    this.messageService.getMessages(this.stuffId, 0, 5).subscribe(response => {
        if (response) {
          this.messages = response;
          console.log(this.messages);
        }
      }
    );
  }

  onChangePage2($event: PageEvent) {
    this.messageService.getMessages(this.stuffId, $event.pageIndex, $event.pageSize).subscribe(response => {
        console.log('sending next page: ' + response);
        if (response) {
          this.messages = response;
          this.pageIndex = $event.pageIndex;
          this.pageSize = $event.pageSize;
        }
      }
    );
    return $event;
  }


}
