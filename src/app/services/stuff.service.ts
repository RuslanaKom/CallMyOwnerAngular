import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {StuffDto} from '../models/generated';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StuffService {
  private readonly HOST;

  constructor(private httpClient: HttpClient) {
    this.HOST = environment.HOST + '/stuff';
  }

  fetchUserStuff(): Observable<StuffDto[]> {
    let params = new HttpParams();
    params = params.append('offset', '0');
    params = params.append('size', '10');
    params = params.append('direction', 'DESC');
    return this.httpClient.get<StuffDto[]>(`${this.HOST}`, {params});
  }

  generateQr(id: string): Observable<File> {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    return this.httpClient.get<File>(`${this.HOST}/qr`, {params});
  }

  saveUpdateStuff(stuffUnit: StuffDto): Observable<StuffDto> {
    return this.httpClient.post<StuffDto>(`${this.HOST}`, stuffUnit);
  }

  fetchStuffById(id: string): Observable<StuffDto> {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    return this.httpClient.get<StuffDto>(`${this.HOST}/id`, {params});
  }

  deleteItem(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    return this.httpClient.delete<StuffDto>(`${this.HOST}`, {params});
  }

  getDefaultMessage(id: string): Observable<string> {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.get(`${this.HOST}/id/defaultMessage`, {headers, responseType: 'text', params});
  }
}
