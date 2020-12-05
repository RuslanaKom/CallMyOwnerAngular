import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/generated';
import {PageEvent} from '@angular/material/paginator';
import {RouteMessagesService} from '../../services/route.messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private stuffId: string;
  stuffName: string;
  pageEvent: PageEvent;
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  sortDirection = 'DESC';
  messageText = '';

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private routeMessagesService: RouteMessagesService) {
  }

  ngOnInit(): void {
    this.routeMessagesService.$stuffName.subscribe(name => this.stuffName = name);
    this.routeMessagesService.$stuffId.subscribe(id => {
      this.stuffId = id;
      this.messageService.getMessages(this.stuffId, this.pageIndex, this.pageSize, this.sortDirection, this.messageText)
        .subscribe(response => {
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
    this.messageService.getMessages(this.stuffId, $event.pageIndex, $event.pageSize, this.sortDirection, this.messageText)
      .subscribe(response => {
          if (response) {
            this.messages = response;
            this.pageIndex = $event.pageIndex;
            this.pageSize = $event.pageSize;
          }
        }
      );
  }

  onSortDirectionChanged($event: string) {
    this.sortDirection = $event;
    this.messageService.getMessages(this.stuffId, this.pageIndex, this.pageSize, this.sortDirection, this.messageText)
      .subscribe(response => {
          if (response) {
            this.messages = response;
          }
        }
      );
  }

  goBack() {
    this.router.navigate(['stuff']);
  }

  onMessageTextEntered() {
    this.messageService.getMessages(this.stuffId, this.pageIndex, this.pageSize, this.sortDirection, this.messageText)
      .subscribe(response => {
          if (response) {
            this.messages = response;
          }
        }
      );
  }
}
