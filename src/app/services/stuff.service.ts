import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PageableResult, StuffDto} from '../models/generated';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StuffService {
  private readonly HOST;

  constructor(private httpClient: HttpClient) {
    this.HOST = environment.HOST + '/stuff';
  }

  fetchUserStuff(offset: number, size: number, sortDirection: string, stuffName: string): Observable<PageableResult<StuffDto>> {
    let params = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('size', String(size));
    params = params.append('direction', sortDirection);
    params = params.append('stuffName', stuffName);
    console.log('fetch user stuff');
    const res = this.httpClient.get<PageableResult<StuffDto>>(`${this.HOST}`, {params});
    console.log(res);
    return res;
  }

  generateQr(id: string): Observable<File> {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    return this.httpClient.get<File>(`${this.HOST}/qr`, {params});
  }

  fetchQRPdf(id: string) {
    let params = new HttpParams();
    params = params.append('stuffId', id);
    return this.httpClient.get(`${this.HOST}/qr`, {responseType: 'blob' as 'json', params}
    );
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
