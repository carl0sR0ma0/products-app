import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Produto } from "./../../core/models/produto.model";
import { ProductsService } from "./../../services/products.service";
import { MatDialog } from '@angular/material/dialog';
import { NewProductComponent } from './new-product/new-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Produtos: Produto[]
  hasError: boolean = false

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
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
      this.hasError = true
    })
  }

  openNewProductModal(): void {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newProductAdded => {      
      if (newProductAdded) {
        this.Produtos = undefined
        this.findAllProducts()
      }
    })
  }

}
