import {CacheHandler} from '../cache-handler';
import {environment} from '../../../environments/environment';

export class BlogHandlers implements CacheHandler{
  supports(url: string): boolean {
    return url.search(/\/api\/blog/) >= 1;
  }

  getDuration(): number {
    return environment.cache.blog;
  }
}
