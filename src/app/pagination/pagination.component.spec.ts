import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';

@Component({
  template:`
  <h1>text component</h1>
  <app-pagination [pagesCount]="testPagesCount"></app-pagination>
  `
})

class TestComponent {
  testPagesCount = 5;
}

describe('Pagination with host', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, TestComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display as many items as testPagesCount', () => {
    component.testPagesCount = 3;
    fixture.detectChanges();

    const document = fixture.nativeElement as HTMLElement;
    expect(document.querySelectorAll('li').length).toBe(5);
  })
});

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment currentPage when nextPage & previousPage is called', () => {
    component.currentPage = 4;

    component.nextPage();
    expect(component.currentPage).toBe(5);

    component.previousPage();
    expect(component.currentPage).toBe(4)
  });

  it('should not decrement when we have reach lower limit', () => {
    component.currentPage = 1;
    component.previousPage();

    expect(component.currentPage).toBe(1);
  });

  it('should not increment when we have reach maximum limit', () => {
    component.currentPage = 10;
    component.pagesCount = 10
    component.nextPage();

    expect(component.currentPage).toBe(10);
  });

  it('should display as many links as the pagesCount', () => {
    const document: HTMLDocument = fixture.nativeElement;
    component.pagesCount = 4;
    fixture.detectChanges();

    //expect(document.querySelectorAll('li').length).toBe(4);
  });

  it('should create array with number', () => {
    component.pagesCount = 4;

    const arr = component.getPages();

    expect(arr.length).toBe(4);
    expect(arr[0]).toBe(1);

    arr.forEach((value, index) =>{
      expect(value ).toBe(index + 1);
    });
  });

  it('should go to next/previous page when next/previous', () => {
    component.pagesCount = 5;
    component.currentPage = 3;

    const next = fixture.debugElement.query(By.css('.next a'));
    next.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(4);

    const previous = fixture.debugElement.query(By.css('.previous a'));
    previous.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(3);
  })

  it('should not go next or previous last/first page', () => {
    component.pagesCount = 2;
    component.currentPage = 2;

    fixture.detectChanges();

    const next = fixture.debugElement.query(By.css('.next a'));
    next.triggerEventHandler('click', null);

    const nextElement = fixture.nativeElement.querySelector('.next') as HTMLElement;
    expect(nextElement.classList.contains('disabled')).toBeTruthy();

    expect(component.currentPage).toBe(2);

    const previous = fixture.debugElement.query(By.css('.previous a'));
    previous.triggerEventHandler('click', null);
    previous.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.currentPage).toBe(1);

    const previousElement = fixture.nativeElement.querySelector('.previous') as HTMLElement;
    expect(previousElement.classList.contains('disabled')).toBeTruthy();
  })

  it('should apply active class on the currentPage element', () => {
    component.currentPage = 3;
    component.pagesCount = 5;

    const document = fixture.nativeElement as HTMLElement;
    const activeElement = document.querySelector('.active');
    expect(activeElement.textContent).toBe('1');
  })

  it('should change currentPage when we click on page link', () => {

  })
});
