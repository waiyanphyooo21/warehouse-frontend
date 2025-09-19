import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Orders } from './orders/orders';
import { Customers } from './customers/customers';

const routes: Routes = [
  // Define routes for sales module here
  {
    path: 'orders',
    component: Orders
  },
  {
    path: 'customers',
    component: Customers
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
