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
    return this.httpClient.get<StuffDto[]>(`${this.HOST}`);
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

}
