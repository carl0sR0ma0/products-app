import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../../services/products.service'
import { Produto } from './../../../core/models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  private htttpRequest: Subscription
  Produto: Produto
  hasError: boolean = false
  productName: String

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productName = this.activatedRoute.snapshot.params['productName']
    this.findProductByName(this.productName)
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

  openUpdateProductModal(): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: this.Produto
    })

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        this.Produto = undefined
        this.findProductByName(this.productName)
      }
    })
  }

}
