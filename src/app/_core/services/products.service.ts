import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KeycloakSecurityService} from './keycloak-security.service';
import {Observable} from 'rxjs';
import {Product, ProductsResponse} from '../models/product.model';
import {map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:8082/products';
  private token = '';

  // private baseUrl = 'http://localhost:8888/PRODUCTS-SERVICE/products';

  constructor(public http: HttpClient, public kcService: KeycloakSecurityService) {
    this.token = this.kcService.kc.token;
    // this.token = this.token;
  }

  getProducts(pageSize: number, pageIndex: number): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.baseUrl + `?page=${pageIndex - 1}&size=${pageSize}`)
      .pipe(
        retry(3),
        map(data => data._embedded.products)
      );
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);

  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + `/${id}`).pipe(
      retry(3));
  }
}
