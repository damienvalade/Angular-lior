import {NgModule} from '@angular/core';
import {CustomerFormComponent} from './customer-form.component';
import {CustomerListComponent} from './customer-list.component';
import {SearchCustomerComponent} from './search-customer.component';
import {SearchResultPipe} from './search-result.pipe';
import {AppRoutingModule} from '../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '../pagination/pagination.component';

@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent,
    SearchCustomerComponent,
    SearchResultPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerListComponent,
    PaginationComponent
  ]
})
export class CustomerModule { }
