import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {AccessToken, User, UserAccountDto, UserAccountWithTokenDto, UserLoginDto} from '../models/generated';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly HOST;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
    this.HOST = environment.HOST + '/user';
  }

  login(userLoginDto: UserLoginDto) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    const options = {
      headers: httpHeaders,
    };
    console.log('From login operation:' + options);
    return this.httpClient.post<HttpResponse<any>>(`${this.HOST}/signin`, userLoginDto, options);
  }

  setTokeObject(token: AccessToken) {
    sessionStorage.setItem('access_token', JSON.stringify(token));
  }

  setToken(response: HttpResponse<any>) {
    sessionStorage.setItem('access_token', JSON.stringify(response));
  }

  logout(): void {
    this.clearAuthCookie();
  }

  clearAuthCookie(): void {
    sessionStorage.clear();
    this.cookieService.deleteAll('/');
  }

  getAuthorizationToken(): string {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      return accessToken;
    }
    console.error('No token found');
    return '';
  }

  getUser(): User | undefined {
    if (this.getAuthorizationToken()) {
      const accessToken: string = this.getAuthorizationToken();
      if (accessToken) {
        const decoded = jwt_decode(accessToken);
        return decoded.sub;
      }
    }
  }

  getLoginName(): string | undefined {
    const user = this.getUser();
    if (user) {
      return user.login_name;
    }
  }

  goToLoginPage(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  registerUser(userAccountDto: UserAccountDto): Observable<UserAccountDto>{
    return this.httpClient.post<UserAccountDto>(`${this.HOST}`, userAccountDto);
  }

  confirmEmail(id: string) {
    return this.httpClient.post<HttpResponse<any>>(`${this.HOST}/confirm`, id);
  }

  getUserProfile(): Observable<UserAccountDto>{
    return this.httpClient.get<UserAccountDto>(`${this.HOST}`);
  }

  updateUserProfile(userAccountDto: UserAccountDto) {
    return this.httpClient.post<UserAccountWithTokenDto>(`${this.HOST}/update`, userAccountDto);
  }
}
