import { Injectable } from '@angular/core';
import {ApiCustomer} from './customer/model/api-customer';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  find(page = 1) {
    return this.http.get('http://localhost:8000/api/blog_posts?page=' + page).pipe(
      map(resultat => {
        return{
          items: resultat['hydra:member'],
          currentPage: page,
          pageCount: this.getPageInUrl(resultat['hydra:view']['hydra:last'])
        };
      })
    );
  }

  private getPageInUrl(url: string): number{
    const resultat = url.match(/page=(\d+)/);
    return +resultat[1];
  }
}
