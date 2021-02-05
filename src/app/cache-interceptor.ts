import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CacheService} from './cache.service';
import {tap} from 'rxjs/operators';
import {CacheHandler} from './http/cache-handler';

export const CACHE_HANDLERS_INJECTION = new InjectionToken<CacheHandler[]>('Liste de cache handlers', {factory: () => []});

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheService,
    @Inject(CACHE_HANDLERS_INJECTION) private handlers: CacheHandler[] = []
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let duration = 60;

    for (const handler of this.handlers) {
      if (!handler.supports(request.url)) {
        continue;
      }
      duration = handler.getDuration();
      break;
    }


    if (this.cache.has(request.url)) {
      return of(this.cache.get(request.url));
    }

    return next.handle(request).pipe(
      tap(value => {
        if (value instanceof HttpResponse) {
          this.cache.set(request.url, value, duration);
        }
      })
    );
  }
}
