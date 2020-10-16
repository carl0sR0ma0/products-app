import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/core/models/categoria.model';
import { Produto } from 'src/app/core/models/produto.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { MyToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  Product: Produto
  productFormGroup: FormGroup
  categories: Categoria[]

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Produto,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private toastr: MyToastrService
  ) { 
    this.Product = data
  }

  ngOnInit(): void {
    this.findAllCategories()
    this.initializeProductFormGroup()
    this.populateProductFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllCategories(): void {
    this.httpRequest = this.categoriesService.findallCategories().subscribe(response => {
      this.categories = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  initializeProductFormGroup(): void {
    this.productFormGroup = this.builder.group({
      sku: this.builder.control(null, [Validators.required]),
      image: this.builder.control(null, [Validators.required]),
      freeShipping: this.builder.control(null, [Validators.required]),
      enabled: this.builder.control(null, [Validators.required]),
      category: this.builder.control(null, [Validators.required]),
      price: this.builder.control(null),
      qty: this.builder.control(null),
      brand: this.builder.control(null),
      model: this.builder.control(null),
      description: this.builder.control(null)
    })
  }

  populateProductFormGroup(): void {
    this.productFormGroup.patchValue({
      sku: this.Product['sku'],
      image: this.Product['image'],
      freeShipping: this.Product['freeShipping'],
      enabled: this.Product['enabled'],
      category: this.Product['category'],
      price: this.Product['price'],
      qty: this.Product['qty'],
      brand: this.Product['brand'],
      model: this.Product['model'],
      description: this.Product['description']
    })
  }

  compareCategory(c1: Categoria, c2: Categoria): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateProduct(): void {
    this.httpRequest = this.productsService.updateProductById(this.Product['_id'], this.productFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O Produto ${this.Product['name']} foi atualizado com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}
