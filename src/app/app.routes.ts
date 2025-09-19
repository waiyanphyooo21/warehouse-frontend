import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { App } from './app';
import { Login } from './login/login';
import { Home } from './home/home';
import { Layout } from './layout/layout';
import { ProductComponent } from './inventory/product/product';
import { CategoryComponent } from './inventory/category/category'; // <-- added
import { SupplierComponent } from './purchase/supplier/supplier';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'inventory/product', component: ProductComponent },
      { path: 'inventory/category', component: CategoryComponent },
      { path: 'purchase/supplier', component: SupplierComponent },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales-module').then((m) => m.SalesModule),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
