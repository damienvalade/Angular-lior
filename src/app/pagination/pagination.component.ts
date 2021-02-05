import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div>
      <ul class="pagination">
        <li class="page-item previous" [ngClass]="{disabled: currentPage == 1}">
          <a class="page-link" (click)="previousPage()" href="#">&laquo;</a>
        </li>
        <li class="page-item" *ngFor="let number of this.numberLi">
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

  currentPage: number = 1;
  pagesCount: number;
  numberLi = this.getPages();

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
