import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteStuffEditService {
  $stuffId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
}
