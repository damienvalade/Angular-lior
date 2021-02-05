import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomerListComponent} from './customer/customer-list.component';
import {CustomerFormComponent} from './customer/customer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchCustomerComponent} from './customer/search-customer.component';
import {SearchResultPipe} from './customer/search-result.pipe';
import {BlogComponent} from './blog/blog.component';
import {ChronometreComponent} from './chronometre/chronometre.component';
import {XhrComponent} from './xhr/xhr.component';
import {Exercice2Component} from './exercice/exercice2.component';
import {BlogPostComponent} from './blog/blog-post.component';
import {PaginationComponent} from './pagination/pagination.component';
import {CACHE_HANDLERS_INJECTION, CacheInterceptor} from './cache-interceptor';
import {CustomersHandlers} from './http/handlers/customers-handlers';
import {BlogHandlers} from './http/handlers/blog-handlers';
import {CustomerModule} from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ChronometreComponent,
    XhrComponent,
    Exercice2Component,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    {
      provide: CACHE_HANDLERS_INJECTION, useValue: [
        new CustomersHandlers(),
        new BlogHandlers()
      ]
    }],
  exports: [
    PaginationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
