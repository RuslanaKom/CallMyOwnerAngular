import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Message} from '../models/generated';
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

  getMessagesCount() {
    return this.httpClient.get<number>(`${this.HOST}` + '/user/count');
  }

  updateMessages(ids: string []) {
    console.log('message update');
    return this.httpClient.post<void>(`${this.HOST}`, ids);
  }

  newMessagesExist(stuffId: string) {
    let params = new HttpParams();
    params = params.append('stuffId', stuffId);
    return this.httpClient.get<boolean>(`${this.HOST}` + '/exists/new', {params} );
  }
}
