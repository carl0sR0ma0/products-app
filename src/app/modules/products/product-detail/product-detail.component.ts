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
  hasError: boolean = false

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
    }, err => {
      this.hasError = true
    })
  }

  verificationFreeShipping(value: boolean): String {
    if (value) {
      return `Frete Grátis`
    } else {
      return `${this.Produto.qty}`
    }
  }

  verificationEstoque(value: boolean): String {
    if (value) {
      return `Estoque Disponível`
    } else {
      return `Estoque não disponível`
    }
  }

}
