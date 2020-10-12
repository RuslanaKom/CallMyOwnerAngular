import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
