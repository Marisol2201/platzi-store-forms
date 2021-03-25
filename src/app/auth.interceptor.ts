import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'

import { TokenService } from './core/services/token.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  //next es como decirle que continue
  //por seguridad devolver un observable(asegura que es correcto)
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request);
  }
  private addToken(request: HttpRequest<any>) {
    const token = this.tokenService.getToken();
    console.log(token, 'token');
    if (token) {
      request = request.clone({
        setHeaders: {
          token,
        },
      });
      return request;
    }
    return request;
  }
}
