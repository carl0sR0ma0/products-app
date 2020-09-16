import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Produto } from "./../../core/models/produto.model";
import { ProductsService } from "./../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Produtos: Produto[]

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.findAllProducts()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllProducts(): void {
    this.httpRequest = this.productsService.findAllProducts().subscribe(response => {
      this.Produtos = response.body['data']
    }, err => {
      console.log(err)
    })
  }

}
