import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakSecurityService} from '../services/keycloak-security.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private keycloakSecurityService: KeycloakSecurityService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('-------------Interceptor-----------');
    if (!this.keycloakSecurityService.kc.authenticated) {
      return next.handle(request);
    }
    const clone = request.clone({
      headers: request.headers.append('Authorization', 'Bearer ' + this.keycloakSecurityService.kc.token)
    });
    return next.handle(clone);

  }
}
