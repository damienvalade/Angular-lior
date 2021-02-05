import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CustomHttpService} from '../exercice/custom-http.service';

@Component({
  selector: 'app-xhr',
  template: `
    <p *ngFor="let c of customer">
      {{c.firstName}}
    </p>
  `,
  styles: [
  ]
})
export class XhrComponent implements OnInit {

  customer: any[] = [];
  error;

  constructor(private http: CustomHttpService) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/customers').pipe(
      map(value => value['hydra:member'])
    ).subscribe(
      value => this.customer = value,
      (error) => this.error =  error,
      () => console.log('c\'est fini')
    );
  }

}
