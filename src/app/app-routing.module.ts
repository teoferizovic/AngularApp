import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryDetailsOverviewComponent } from './categories/category-details/category-details-overview/category-details-overview.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'categories/:id',
    component: CategoryDetailsComponent,
    canActivate:[AuthGuard],
    children:[{
      path: 'overview',
      component: CategoryDetailsOverviewComponent,
    }]
  },
  /*{
    path: 'products',
    component: ProductComponent,
    canActivate:[AuthGuard]
  },*/
  {
    path: 'products',
    loadChildren:'./product/product.module#ProductModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
