import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgrokInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    // clone another request that includes the access token as the original request is immutable
    // req = req.clone({
    //   headers: req.headers.set('ngrok-skip-browser-warning', `_`),
    // });

    return await lastValueFrom(next.handle(req));
  }
}
