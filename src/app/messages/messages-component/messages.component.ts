import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/generated';
import {PageEvent} from '@angular/material/paginator';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private stuffId: string;
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize = 5;
  length = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.stuffId = id;
    this.messageService.getMessages(this.stuffId, 0, this.pageSize).subscribe(response => {
        if (response) {
          this.messages = response;
        }
      }
    );
    this.messageService.getMessagesCount(this.stuffId).subscribe(response => {
      if (response) {
        this.length = response;
      }
    });
  }

  getNewMessagesIds(): string[] {
    return this.messages.filter(m => m.new).map(m => m.id);
  }

  ngOnDestroy(): void {
    const newMessagesIds = this.getNewMessagesIds();
    if (this.getNewMessagesIds().length) {
      this.messageService.updateMessages(newMessagesIds).subscribe();
    }
  }

  onChangePage($event: PageEvent) {
    const newMessagesIds = this.getNewMessagesIds();
    if (newMessagesIds.length) {
      this.messageService.updateMessages(newMessagesIds).subscribe(() =>
        this.getNextMessagesPage($event)
      );
    } else {
      this.getNextMessagesPage($event);
    }
    return null;
  }

  getNextMessagesPage($event: PageEvent) {
    this.messageService.getMessages(this.stuffId, $event.pageIndex, $event.pageSize).subscribe(response2 => {
        if (response2) {
          this.messages = response2;
          this.pageIndex = $event.pageIndex;
          this.pageSize = $event.pageSize;
        }
      }
    );
  }

}
