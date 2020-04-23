import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { CredentialsService } from '@app/auth';
import { Router } from '@angular/router';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private credentialService: CredentialsService;

  constructor(private injector: Injector, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.credentialService = this.injector.get(CredentialsService);
          this.credentialService.setCredentials();
          this.router.navigate(['/login']);
        } else if (err.error) {
          const error = err.error.message || err.statusText;
          log.error('Request error', error);
          return throwError(error);
        }

        return throwError('');
      })
    );
  }
}
