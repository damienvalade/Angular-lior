import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div>
      <ul class="pagination">
        <li class="page-item previous" [ngClass]="{disabled: currentPage == 1}">
          <a class="page-link" (click)="previousPage()">&laquo;</a>
        </li>
        <li class="page-item" [ngClass]="{active: number === currentPage}" *ngFor="let number of this.getPages()">
          <a class="page-link" (click)="changePage(number)">{{ number }}</a>
        </li>
        <li class="page-item next" [ngClass]="{disabled: currentPage === pagesCount}">
          <a class="page-link next" (click)="nextPage()">&raquo;</a>
        </li>
      </ul>
    </div>
  `,
  styles: [
  ]
})
export class PaginationComponent implements OnInit {

  @Input() pagesCount  = 1;
  @Input() currentPage = 1;

  @Output() onPageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  changePage(number: number) {
    this.currentPage = number;
    this.onPageChange.next(number);
  }

  nextPage() {
    if (this.currentPage === this.pagesCount) {
      return;
    }
    this.changePage(this.currentPage + 1);
  }

  previousPage() {
    if (this.currentPage > 1){
      this.changePage(this.currentPage - 1);
    }
  }

  getPages() {
    return Array(this.pagesCount).fill(0).map((value, index) => index + 1);
  }
}
