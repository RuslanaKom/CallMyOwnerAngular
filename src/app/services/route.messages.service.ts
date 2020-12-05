import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteMessagesService {
  $stuffId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  $stuffName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
}
