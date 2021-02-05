import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div>
      <ul class="pagination">
        <li class="page-item previous" [ngClass]="{disabled: currentPage == 1}">
          <a class="page-link" (click)="previousPage()" href="#">&laquo;</a>
        </li>
        <li class="page-item" [ngClass]="{active: number === currentPage}" *ngFor="let number of this.getPages()">
          <a class="page-link" href="#">{{ number }}</a>
        </li>
        <li class="page-item next" [ngClass]="{disabled: currentPage === pagesCount}">
          <a class="page-link next" (click)="nextPage()" href="#">&raquo;</a>
        </li>
      </ul>
    </div>
  `,
  styles: [
  ]
})
export class PaginationComponent implements OnInit {

  @Input() pagesCount: number;
  @Input() currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  nextPage() {
    if (this.currentPage === this.pagesCount) {
      return;
    }
    this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1){
      this.currentPage --;
    }
  }

  getPages() {
    return Array(this.pagesCount).fill(0).map((value, index) => index + 1);
  }
}
