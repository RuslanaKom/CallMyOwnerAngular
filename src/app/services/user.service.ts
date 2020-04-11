import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {User} from '../models/generated';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly HOST;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
    this.HOST = environment.HOST;
  }

  login(username: string, password: string): Observable<void> {
    // return this.httpClient.get<void>(`${this.HOST}/tmbp/auth/${personalNumber}`);
    // todo implement login
    return null;
  }

  logout(): void {
    this.clearAuthCookie();
  }

  clearAuthCookie(): void {
    this.cookieService.deleteAll('/');
  }

  getAuthorizationToken(): string {
    const accessToken = this.cookieService.get('access_token');
    if (accessToken) {
      return accessToken;
    }
    console.error('No token found');
    return '';
  }

  getUser(): User | undefined {
    const accessToken = this.getAuthorizationToken();
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      // @ts-ignore
      return decoded.user;
    }
  }

  getLoginName(): string | undefined {
    const user = this.getUser();
    if (user) {
      return user.login_name;
    }
  }

  goToLoginPage(): Promise<boolean> {
    return this.router.navigate(['/signin']);
  }

  registerUser(username: string, password: string, email: string) : Observable<void> {
    // return this.httpClient.get<void>(`${this.HOST}/tmbp/auth/${personalNumber}`);
    // todo implement registration
    return null;
  }
}
