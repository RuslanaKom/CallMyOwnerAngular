import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,  private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.userService.getAuthorizationToken();
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken
        }
      });
    }
    return next.handle(request);
  }
}
