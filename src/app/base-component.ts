import {Subscription} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';

@Component({
  template: ''
})

export class BaseComponent implements OnDestroy{
  protected subscription: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  protected addSubscription(s): void{
    this.subscription.push(s);
  }
}
