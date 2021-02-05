import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from './model/customer';
import {CustomerService} from '../customer.service';
import {map, switchMap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  template: `
    <div *ngIf="customers">
      <div class="alert alert-danger" role="alert" *ngIf="hasError">DOMMAGE</div>
      <h2>{{ customers.fullName }}</h2>
      <form (ngSubmit)="handleSubmit()" [formGroup]="form">
        <div class="form-group">
          <input type="text" name="fullName" formControlName="fullName" class="form-control" placeholder="Nom complet">
        </div>
        <div class="form-group">
          <input type="text" name="email" formControlName="email" class="form-control" placeholder="email">
        </div>
        <button class="btn btn-success">Enregistrer</button>
        <a routerLink="/" class="btn btn-light ml-2">Retour</a>
      </form>
    </div>
  `,
  styles: []
})
export class CustomerFormComponent implements OnInit {

  customers: Customer;
  hasError: boolean = false;

  form = new FormGroup({
      email: new FormControl(),
      fullName: new FormControl()
  });

  constructor(private service: CustomerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => +params.get('id')),
      switchMap(id => this.service.find(id))
    ).subscribe( data => {
      this.customers = data;
      this.form.patchValue(this.customers);
    } );
  }

  handleSubmit() {
    const customer = {...this.customers, ...this.form.value};
    this.service.update(customer).subscribe(
      () => this.router.navigateByUrl('/'),
      () => this.hasError = true
    );
  }
}
