import {Component, OnInit} from '@angular/core';
import {Customer} from './model/customer';
import {CustomerService} from '../customer.service';
import {Observable, Subscription} from 'rxjs';

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
      <tr *ngFor="let c of customers | async">
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
  `,
  styles: []
})
export class CustomerListComponent implements OnInit {

  customers: Observable<Customer[]>;
  destroyCustomers: Subscription;

  constructor(private service: CustomerService) {
  }

  ngOnInit(): void {
    // this.service.findAll().subscribe(data => this.customers = data);
    this.customers = this.service.findAll();
  }

  ngOnDestroy():void{
    this.destroyCustomers.unsubscribe();
  }

  onDelete(c: Customer): void {
    this.service.delete(c).subscribe();
  }
}
