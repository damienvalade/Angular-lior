import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerFormComponent } from './customer/customer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchCustomerComponent } from './customer/search-customer.component';
import { SearchResultPipe } from './customer/search-result.pipe';
import { BlogComponent } from './blog/blog.component';
import { ChronometreComponent } from './chronometre/chronometre.component';
import { XhrComponent } from './xhr/xhr.component';
import { Exercice2Component } from './exercice/exercice2.component';
import { BlogPostComponent } from './blog/blog-post.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent,
    SearchCustomerComponent,
    SearchResultPipe,
    BlogComponent,
    ChronometreComponent,
    XhrComponent,
    Exercice2Component,
    BlogPostComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
