import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CacheService} from './cache.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handler1 = {
      supports(url: string){
        return url.search(/\/api\/customers/) >= 1;
      },
      getTime(){
        return 50;
      }
    }


    const handler2 = {
      supports(url: string){
        return url.search(/\/api\/blog/) >= 1;
      },
      getTime(){
        return 200;
      }
    }

    if (this.cache.has(request.url)){
      return of(this.cache.get(request.url));
    }

    return next.handle(request).pipe(
      tap(value => {
        if (value instanceof HttpResponse) {
          this.cache.set(request.url, value);
        }
      })
    );
  }
}
