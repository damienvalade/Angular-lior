import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Customer} from './customer/model/customer';
import {ApiCustomer} from './customer/model/api-customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  mapApiCustomer(apiCustomer: ApiCustomer): Customer {
    return {
      id: apiCustomer.id,
      email: apiCustomer.email,
      invoices: apiCustomer.invoices,
      fullName: apiCustomer.firstName + ' ' + apiCustomer.lastName
    } as Customer;
  }

  findAll(page = 1) {
    return this.http.get('http://localhost:8000/api/customers?page=' + page).pipe(
      map(value => {
        return{
          items: (value['hydra:member'] as ApiCustomer[]).map(this.mapApiCustomer),
          currentPage: page,
          pagesCount: this.getPageInUrl(value['hydra:view']['hydra:last'])
        }
      })
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
      map(this.mapApiCustomer)
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

  private getPageInUrl(url: string): number{
    const result = url.match(/page=(\d+)/);
    return +result[1];
  }
}
