import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NgZorroAntdModule, NzLayoutModule} from 'ng-zorro-antd';
import {ProductsComponent} from './Component/products/products.component';
import {BillsComponent} from './Component/bills/bills.component';
import {AddProductsComponent} from './Component/products/add-products/add-products.component';
import {ProductDetailsComponent} from './Component/products/product-details/product-details.component';
import {CustomersComponent} from './Component/customers/customers.component';
import {AddCustomerComponent} from './Component/customers/add-customer/add-customer.component';
import {CustomerDetailsComponent} from './Component/customers/customer-details/customer-details.component';
import {BillDetailsComponent} from './Component/bills/bill-details/bill-details.component';
import {AddBillComponent} from './Component/bills/add-bill/add-bill.component';
import {KeycloakSecurityService} from './_core/services/keycloak-security.service';
import {AuthorizationInterceptor} from './_core/interceptors/authorization.interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BillsComponent,
    AddProductsComponent,
    ProductDetailsComponent,
    CustomersComponent,
    AddCustomerComponent,
    CustomerDetailsComponent,
    BillDetailsComponent,
    AddBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}
    ,
    {
      provide: APP_INITIALIZER, deps: [KeycloakSecurityService], useFactory: (fc: KeycloakSecurityService) => () => fc.init(), multi: true
    }
    ,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
