import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {AccessToken, StuffDto, User, UserAccountDto, UserLoginDto} from '../models/generated';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StuffService {
  private readonly HOST;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              private userService: UserService) {
    this.HOST = environment.HOST + '/stuff';
  }

  fetchUserStuff(): Observable<StuffDto[]> {
    return this.httpClient.get<StuffDto[]>(`${this.HOST}`);
  }

}
