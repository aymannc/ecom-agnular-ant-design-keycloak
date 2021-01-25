import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Product} from '../../../_core/models/product.model';
import {ProductsService} from '../../../_core/services/products.service';
import {tap} from 'rxjs/operators';
import {KeycloakSecurityService} from '../../../_core/services/keycloak-security.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  isLoading = true;
  product: Product;
  routerSubscription: Subscription;

  constructor(public kss: KeycloakSecurityService, private router: Router, private productsService: ProductsService,
              private route: ActivatedRoute, private modal: NzModalService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.routerSubscription = this.route.params.subscribe((p: Params) => {
        this.productsService.getProduct(+p.id)
          .pipe(tap((product: Product) => {
            this.isLoading = false;
            this.product = product;
          }))
          .subscribe(_ => {
          }, _ => {
            this.isLoading = false;
            this.product = null;
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  navigateToProducts() {
    this.router.navigateByUrl('/products');
  }

  modifyProduct() {
    this.router.navigateByUrl('/products/modify/' + this.product.id);
  }

  deleteProduct() {
    // this.modal.confirm({
    //   nzTitle: 'Are you sure delete this movie?',
    //   nzOkText: 'Yes',
    //   nzOkType: 'danger',
    //   nzOnOk: () => this.cinemaService.deleteMovie(this.movie.id).subscribe(_ => {
    //     this.message.create('success', `Movies deleted successfully`, {nzPauseOnHover: true});
    //     this.movie = null;
    //   }, error => {
    //     console.log(error);
    //   }),
    //   nzCancelText: 'No',
    // });
  }

}
