import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {StuffDto} from '../models/generated';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly HOST;

  constructor(private httpClient: HttpClient) {
    this.HOST = environment.HOST + '/contact';
  }

  sendMessageToOwner(id: string, message: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let params = new HttpParams();
    params = params.append('id', id);
    const options = {
      httpHeaders,
      params
    };
    return this.httpClient.post(`${this.HOST}/sendmessage`, message, options);
  }
}
