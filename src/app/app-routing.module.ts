import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/welcome/welcome.module').then(module => module.WelcomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(module => module.ProductsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/categories/categories.module').then(module => module.CategoriesModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
