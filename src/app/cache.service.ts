import { Injectable } from '@angular/core';


export interface CacheItem {
  value: any;
  initialTime: number;
  duration: number;
}

export interface CacheStorage {
  [key: string]: CacheItem;
}

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  storage: CacheStorage = {}

  constructor() { }

  invalidate(key: string){
    delete this.storage[key];
  }

  set(key: string, value: any, duration = 60) {
    this.storage[key] = {
      value: value,
      initialTime: Date.now(),
      duration: duration * 1000
    };
  }

  get(key: string){
    if(!this.has(key)){
      return null;
    }
    return this.storage[key].value

  }

  has(key: string){
    const item = this.storage[key];

    if(!item){
      return undefined;
    }

    return (item.initialTime + item.duration) > Date.now();
  }
}
