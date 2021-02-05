import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Customer} from './customer/model/customer';
import {ApiCustomer} from './customer/model/api-customer';
import {CacheService} from './cache.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private cache: CacheService) {
  }

  mapApiCustomer(apiCustomer: ApiCustomer): Customer {
    return {
      id: apiCustomer.id,
      email: apiCustomer.email,
      invoices: apiCustomer.invoices,
      fullName: apiCustomer.firstName + ' ' + apiCustomer.lastName
    } as Customer;
  }

  findAll() {
    if (this.cache.has('customer.list')) {
      return of(this.cache.get('customer.list'));
    }
    return this.http.get('http://localhost:8000/api/customers').pipe(
      map(data => {
        return data['hydra:member'] as ApiCustomer[];
      }),
      map(apiCustomers => {
        return apiCustomers.map(this.mapApiCustomer);
      }),
      tap(value => this.cache.set('customer.list', value))
    );
  }

  find(id: number) {
    return this.http.get<ApiCustomer>('http://localhost:8000/api/customers/' + id).pipe(
      map(this.mapApiCustomer));
  }

  update(customer: Customer) {
    const [firstName, lastName] = customer.fullName.split(' ');
    const apiCustomer = {
      id: customer.id,
      firstName: firstName,
      lastName: lastName,
      email: customer.email,
    };
    return this.http.put<ApiCustomer>('http://localhost:8000/api/customers/' + customer.id, apiCustomer).pipe(
      map(this.mapApiCustomer),
      tap(value => this.cache.invalidate('customer.list'))
    );
  }

  delete(c: Customer) {
    return this.http.delete('http://localhost:8000/api/customers/' + c.id);
  }

  search(value: string) {
    return this.http.get('http://localhost:8000/api/customers/search?q=' + value).pipe(
      map(resultat => resultat['hydra:member'] as ApiCustomer[]),
      map(apiCustomers => {
        return apiCustomers.map(this.mapApiCustomer);
      })
    );
  }
}
