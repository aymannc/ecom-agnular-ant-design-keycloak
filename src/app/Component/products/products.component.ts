import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {ProductsService} from '../../_core/services/products.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Product} from '../../_core/models/product.model';
import {CinemaService} from '../../Service/cinema.service';
import {KeycloakSecurityService} from '../../_core/services/keycloak-security.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  pageSize = 10;
  pageIndex = 1;
  totalElements = 10;
  isLoading = false;
  private ngUnsubscribe = new Subject();

  constructor(private router: Router, private productsService: ProductsService,
              private modal: NzModalService, public kss: KeycloakSecurityService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  getProducts(pageSizeChanged = false) {
    this.isLoading = true;
    this.productsService.getProducts(this.pageSize, pageSizeChanged ? 1 : this.pageIndex)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(data => {
          this.products = data;
          this.isLoading = false;
        })
      ).subscribe(value => {}, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  goToAddProduct() {
    this.router.navigateByUrl('products/add');
  }

  goToDetails(id: number) {
    if (id !== null) {
      this.router.navigateByUrl('products/details/' + id);
    }
  }

  deleteProduct(id: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this movie?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.productsService.deleteProduct(id).subscribe(response => {
        this.getProducts();
      }, error => {
        console.log(error);
      }),
      nzCancelText: 'No',
    });
  }

  editMovie(id: number) {
    if (id !== null) {
      this.router.navigateByUrl('products/modify/' + id);
    }
  }

  editProduct(id: number) {
    if (id !== null) {
      this.router.navigateByUrl('products/modify/' + id);
    }
  }
}
