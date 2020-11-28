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
  sbj: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
        }
      }
    );
    this.messageService.getMessagesCount().subscribe(response => {
      if (response) {
        this.length = response;
      }
    });
  }

  ngOnDestroy(): void {
    this.setMessagesAsSeen();
  }

  // onChangePage($event: PageEvent) {
  //   this.setMessagesAsSeen().subscribe(response => {
  //     this.messageService.getMessages(this.stuffId, $event.pageIndex, $event.pageSize).subscribe(response2 => {
  //         if (response2) {
  //           this.messages = response2;
  //           this.pageIndex = $event.pageIndex;
  //           this.pageSize = $event.pageSize;
  //         }
  //       }
  //     );
  //   });
  //   return null;
  // }


  onChangePage($event: PageEvent) {
    console.log($event);
    console.log(this.sbj.getValue());
    this.setMessagesAsSeen();
    this.sbj.subscribe((result) => {
      this.messageService.getMessages(this.stuffId, $event.pageIndex, $event.pageSize).subscribe(response2 => {
          if (response2) {
            this.messages = response2;
            this.pageIndex = $event.pageIndex;
            this.pageSize = $event.pageSize;
          }
        }
      );
    });
    return null;
  }

  // setMessagesAsSeen() {
  //   const newMessagesIds = this.messages.filter(m => m.new).map(m => m.id);
  //   return this.messageService.updateMessages(newMessagesIds);
  // }

  setMessagesAsSeen() {
    const newMessagesIds = this.messages.filter(m => m.new).map(m => m.id);
    if (newMessagesIds.length) {
      this.messageService.updateMessages(newMessagesIds).subscribe(() =>
        this.sbj.next(true)
      );
    }
    else {
      this.sbj.next(false);
    }
  }
}
