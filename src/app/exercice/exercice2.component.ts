import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-exercice2',
  template: `
    <p>
      exercice2 works!
    </p>
  `,
  styles: []
})
export class Exercice2Component implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const observable = new Observable(observer => {
      const users = [
        {name: 'Joseph', score: 100},
        {name: 'Yannis', score: 200},
        {name: 'Jules', score: 150},
        {name: 'Lior', score: 45},
        {name: 'Jordan', score: 233},
        {name: 'Xavier', score: 120},
        {name: 'Damien', score: 90},
        {name: 'Hugo', score: 112},
      ];

      users.sort((a, b) => {
        return b.score - a.score;
      });

      let count = 0;

      const interval = setInterval(() => {
        observer.next(users[count]);
        count++;

        if (users.length === count){
          observer.complete();
          clearInterval(interval);
        }
      }, 1000);
    });

    observable.pipe(
      filter((value: { name: string , score: number }) => value.score > 100),
      map( (value: { name: string , score: number }) => value.name.toUpperCase())
    ).subscribe(
      (value) => console.log(value),
      (error) => console.log(error),
      () => console.log('Fin !')
    );
  }
}
