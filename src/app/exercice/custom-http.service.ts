import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {jsDocComment} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor() {
  }

  private request<T>(url: string, params: RequestInit = {}): Observable<T>{
    return new Observable<T>((observer) => {
      fetch(url)
        .then(value => value.json())
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(error => observer.error(error));
      /*
             const xhr = new XMLHttpRequest();
             xhr.open('GET', url);
             xhr.addEventListener('load', () => {
              try{
                const json = JSON.parse(xhr.responseText);
                observer.next(json);
                observer.complete();
              }catch (error){
                observer.error(error);
              }
            });
             xhr.send();
             });
      */
    });
  }

  get<T>(url: string): Observable<T> {
    return this.request<T>(url);
  }

  post<T>(url: string): Observable<T>{
    return this.request<T>(url, {
      method: 'POST'
    });
  }
}
