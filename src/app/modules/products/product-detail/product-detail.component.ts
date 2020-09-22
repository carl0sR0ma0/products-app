import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../services/products.service'
import { Produto } from './../../../core/models/produto.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  private htttpRequest: Subscription
  Produto: Produto

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    const productName = this.activatedRoute.snapshot.params['productName']
    this.findProductByName(productName)
  }

  ngOnDestroy(): void {
    this.htttpRequest.unsubscribe()
  }

  findProductByName(productName: String): void {
    this.htttpRequest = this.productService.findProductByName(productName).subscribe(response => {
      this.Produto = response.body['data']
      console.log(this.Produto)
    }, err => {
      console.log(err)
    })
  }

}
