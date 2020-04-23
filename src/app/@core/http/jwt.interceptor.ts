import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserLocal = JSON.parse(localStorage.getItem('credentials'));

    if (currentUserLocal && currentUserLocal.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserLocal.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
