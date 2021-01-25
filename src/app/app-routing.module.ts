import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './Component/products/products.component';
import {AddProductsComponent} from './Component/products/add-products/add-products.component';
import {ProductDetailsComponent} from './Component/products/product-details/product-details.component';
import {CustomersComponent} from './Component/customers/customers.component';
import {AddCustomerComponent} from './Component/customers/add-customer/add-customer.component';
import {CustomerDetailsComponent} from './Component/customers/customer-details/customer-details.component';
import {BillsComponent} from './Component/bills/bills.component';
import {AddBillComponent} from './Component/bills/add-bill/add-bill.component';
import {BillDetailsComponent} from './Component/bills/bill-details/bill-details.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/products', pathMatch: 'full',
  },
  {
    path: 'products',
    children: [
      {path: '', component: ProductsComponent},
      {path: 'add', component: AddProductsComponent},
      {path: 'details/:id', component: ProductDetailsComponent},
      {path: 'modify/:id', component: AddProductsComponent}
    ]
  },
  {
    path: 'customers',
    children: [
      {path: '', component: CustomersComponent},
      {path: 'add', component: AddCustomerComponent},
      {path: 'details/:id', component: CustomerDetailsComponent},
      {path: 'modify/:id', component: AddCustomerComponent}
    ]
  },
  {
    path: 'bills',
    children: [
      {path: '', component: BillsComponent},
      {path: 'add', component: AddBillComponent},
      {path: 'details/:id', component: BillDetailsComponent},
      {path: 'modify/:id', component: AddBillComponent}
    ]
  },
  {
    path: '**', redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
