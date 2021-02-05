import { Component, OnInit } from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-chronometre',
  template: `
    <p>
      chronometre works!
    </p>
  `,
  styles: [
  ]
})
export class ChronometreComponent implements OnInit {

  intervalSubcription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.intervalSubcription = interval(1000).subscribe(() => {
      console.log('Massage reçu');
    });
  }

  ngOnDestroy(){
    this.intervalSubcription.unsubscribe();
  }
}
