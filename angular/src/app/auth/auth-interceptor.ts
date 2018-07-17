import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    // clone the request rather than working in the original request
    // adding Bearer is just a convention
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken) // modify the cloned request with given configuration
    });
    return next.handle(authRequest); // forwrd request
  }
}
