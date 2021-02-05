import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap, map} from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  template: `
    <h1 *ngIf="!post && error == false">Article en cours de chargement</h1>
    <div *ngIf="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <img [src]="post.image">
    </div>
    <div class="error alert alert-danger" *ngIf="error">
      {{ errorMessage }}
    </div>
  `,
  styles: []
})
export class BlogPostComponent implements OnInit {

  post: any;
  id: number;
  error: boolean = false;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(value => +value.get('id')),
      tap(value => this.id = value),
      switchMap(value => this.http.get('http://localhost:8000/api/blog_posts/' + this.id))
    ).subscribe(
      value => this.post = value,
      error1 => {
        this.error = true;
        this.errorMessage = "Nous n'avons pas trouver de post";
      }
    );
  }
}
