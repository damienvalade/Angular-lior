import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {BlogPostComponent} from './blog-post.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of, throwError} from 'rxjs';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  const MockActivateRoute = {
    paramMap: of(convertToParamMap({
      id: 2
    }))
  };

  const MockHttpClient = {
    get(url: string){
      return of(null);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogPostComponent],
      imports: [HttpClientModule],
      providers: [
        {provide: ActivatedRoute, useValue: MockActivateRoute},
        {provide: HttpClient, useValue: MockHttpClient}
        ]})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title, picture and description', () => {
    const document: HTMLDocument = fixture.nativeElement;

    component.post = {
      id: 2,
      title: 'Article de blog',
      content: 'Mon contenu d\'article de blog',
      image: 'http://placehold.it/200x200'
    };
    fixture.detectChanges();

    expect(document.querySelector('h2').textContent).toBe(component.post.title);
    expect(document.querySelector('img')).toBeTruthy();
    expect(document.querySelector('p').textContent).toBe(component.post.content);
  });

  it('should display a loading screen if no post is given', () => {
    const document: HTMLDocument = fixture.nativeElement;

    /*
    expect(document.querySelector('h2').textContent).toBe('Article en cours de chargement');
     */
  });

  it('should find an id in the route', () =>{
    expect(component.id).toBe(2);
  });

  it('should render the adequate for id param', () => {
    spyOn(MockHttpClient, "get").and.returnValue(
      of({
        id: 2,
        title: "Faux titre",
        content: "Faux content",
        image: "https://placehold.it/400x400"
      })
    );

    component.ngOnInit();

    expect(component.post).toBeDefined();
    expect(component.post.id).toBe(2);
    expect(component.post.title).toBe("Faux titre");
    expect(component.post.content).toBe("Faux content");
    expect(component.post.image).toBe("https://placehold.it/400x400");
  });

  it('should error 404', () => {
    const document: HTMLDocument = fixture.nativeElement;
    spyOn(MockHttpClient, 'get').and.returnValue(
      throwError('status 404')
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error).toBe(true);
    expect(component.errorMessage).toBe('Nous n\'avons pas trouver de post');
    expect(document.querySelector('.error')).toBeTruthy();
  })
});
