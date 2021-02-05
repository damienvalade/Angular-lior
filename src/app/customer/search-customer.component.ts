import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, switchMap, tap} from 'rxjs/operators';
import {CustomerService} from '../customer.service';
import {Customer} from './model/customer';

@Component({
  selector: 'app-search-customer',
  template: `
    <input type="text" [formControl]="searchInput" placeholder="Recherche" class="form-control">
    <div *ngIf="results.length > 0" class="container">
      <a class="col-12" routerLink="/customers/{{r.id}}" *ngFor="let r of results" [innerHTML]="r | searchResult: searchInput.value">
      </a>
    </div>
  `,
  styles: []
})
export class SearchCustomerComponent implements OnInit {

  searchInput = new FormControl();
  results: Customer[] = [];

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      filter(value => value.length > 0),
      switchMap(value => this.service.search(value)),
      tap(value => this.results = value),
    ).subscribe(results => console.log(results));
  }

}
