import {CacheHandler} from '../cache-handler';
import {environment} from '../../../environments/environment';

export class CustomersHandlers implements CacheHandler{
  supports(url: string): boolean {
    return url.search(/\/api\/customers/) >= 1;
  }

  getDuration(): number {
    return environment.cache.customers;
  }
}
