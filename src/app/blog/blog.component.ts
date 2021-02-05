import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent, Subscription} from 'rxjs';
import {filter, switchMap, map, throttleTime, tap} from 'rxjs/operators';
import {BlogService} from '../blog.service';
import {BaseComponent} from '../base-component';

@Component({
  selector: 'app-blog',
  template: `
    <h2>Nos dernières publications</h2>
    <div class="alert alert-light clearfix" *ngFor="let post of blogPosts">
      <h3>{{ post.title }}</h3>
      <img [src]="post.image" alt="" class="float-left mr-1 mb-1" style="width:200px">
      <p>{{ post.content }}</p>
    </div>
    <div style="font-size: 3rem" *ngIf="isLoading">
      chargement des autres ariticles
    </div>
  `,
  styles: [
  ]
})
export class BlogComponent extends BaseComponent implements OnInit {

  blogPosts = [];
  isLoading: boolean;
  currentPage = 1;
  pagesCount: number = null;

  constructor(private http: HttpClient, private service: BlogService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(fromEvent(window, 'scroll').pipe(
      filter(() =>
        window.scrollY + window.innerHeight >= document.body.offsetHeight &&
        !this.isLoading &&
        this.currentPage < this.pagesCount
      ),
      tap(() => this.isLoading = true),
      tap(() => this.currentPage++),
      switchMap(() => this.service.find(this.currentPage)),
    ).subscribe((resultat) => {
      this.isLoading = false;
      this.blogPosts.push(...resultat.items);
    }));

    this.addSubscription( this.service.find()
      .subscribe(result => {
        this.blogPosts = result.items;
        this.currentPage = result.currentPage;
        this.pagesCount = result.pageCount;
      }));
  }

}
