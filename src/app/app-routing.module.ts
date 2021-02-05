import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './customer/customer-list.component';
import {CustomerFormComponent} from './customer/customer-form.component';
import {BlogComponent} from './blog/blog.component';
import {ChronometreComponent} from './chronometre/chronometre.component';
import {XhrComponent} from './xhr/xhr.component';
import {Exercice2Component} from './exercice/exercice2.component';
import {BlogPostComponent} from './blog/blog-post.component';

const routes: Routes = [
  {path: '', component: CustomerListComponent},
  {path: 'customers/:id', component: CustomerFormComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'chronometre', component: ChronometreComponent},
  {path: 'xhr', component: XhrComponent},
  {path: 'exercice', component: Exercice2Component},
  {path: 'post/:id', component: BlogPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
