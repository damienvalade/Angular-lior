import {Component, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from '../customer.service';
import {Observable, Subscription} from 'rxjs';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';

@Component({
  selector: 'app-customer-list',
  template: `
    <h2>Liste des clients</h2>
    <app-search-customer></app-search-customer>
    <table class="table">
      <thead>
      <tr>
        <th>Client</th>
        <th>Email</th>
        <th>Facture</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let c of customers">
        <td>{{ c.fullName }}</td>
        <td>{{ c.email }}</td>
        <td>{{ c.invoices.length }}</td>
        <td>
          <a [routerLink]="['customers', c.id]" class="btn btn-primary btn-sm">Modifier</a>
          <button class="btn btn-danger btn-sm ml-1" (click)="onDelete(c)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
    <app-pagination *ngIf="pagesCount > 1" [pagesCount]="pagesCount" [currentPage]="currentPage" (onPageChange)="refreshCustomer($event)"></app-pagination>
  `,
  styles: []
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  destroyCustomers: Subscription;

  pagesCount: number = 1;
  currentPage: number = 1;

  constructor(private service: CustomerService) {
  }

  ngOnInit(): void {
    // this.service.findAll().subscribe(data => this.customers = data);
    this.destroyCustomers = this.service.findAll().subscribe(value => {
        this.customers = value.items;
        this.pagesCount = value.pagesCount;
    });
  }

  refreshCustomer(page: number){
    this.currentPage = page;

    this.destroyCustomers = this.service.findAll(page).subscribe(value => {
      this.customers = value.items;
      this.pagesCount = value.pagesCount;
    });
  }

  ngOnDestroy():void{
    this.destroyCustomers.unsubscribe();
  }

  onDelete(c: Customer): void {
    this.service.delete(c).subscribe();
  }
}
