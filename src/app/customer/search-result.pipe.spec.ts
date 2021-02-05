import { SearchResultPipe } from './search-result.pipe';
import {Customer} from './model/customer';

describe('SearchResultPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchResultPipe();
    expect(pipe).toBeTruthy();
  });

  it('return fullname and email', () => {
    const customer: Customer = {
      id: 10,
      fullName: 'machin bidule',
      email: 'machin.bidule@truc.fr',
      invoices: []
    };
    const pipe = new SearchResultPipe();
    const result = pipe.transform(customer);
    expect(result).toBe('machin bidule (machin.bidule@truc.fr)');
  });

  it('strong element', () => {
    const customer: Customer = {
      id: 10,
      fullName: 'machin bidule',
      email: 'machin.bidule@truc.fr',
      invoices: []
    };
    const search = 'ma';

    const pipe = new SearchResultPipe();
    const result = pipe.transform(customer, search);

    expect(result).toBe('<strong>ma</strong>chin bidule (<strong>ma</strong>chin.bidule@truc.fr)');
  });
});
