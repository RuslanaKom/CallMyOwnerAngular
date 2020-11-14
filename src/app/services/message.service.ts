import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Message, StuffDto} from '../models/generated';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly HOST;

  constructor(private httpClient: HttpClient) {
    this.HOST = environment.HOST + '/message';
  }

  getMessages(id: string, offset: number, size: number): Observable<Message[]> {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    params = params.append('offset', String(offset));
    params = params.append('size', String(size));
    params = params.append('direction', 'DESC');
    return this.httpClient.get<Message[]>(`${this.HOST}`, {params});
  }
}
