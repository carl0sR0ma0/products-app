import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Categoria } from './../../../core/models/categoria.model';
import { CategoriesService } from './../../../services/categories.service';
import { MyToastrService } from '../../../services/toastr.service';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  categoryFormGroup: FormGroup
  productFormGroup: FormGroup
  isNewCategory: boolean = false
  categorias: Categoria[]
  stepCategoryLabel: String = 'Categoria'

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private categoryService: CategoriesService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private productService: ProductsService,
    private dialogRef: MatDialogRef<NewProductComponent>
  ) { }

  ngOnInit(): void {
    this.findAllCategories()
    this.initializeSelectCategoryFormGroup()
    this.initializeProductFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllCategories(): void {
    this.httpRequest = this.categoryService.findallCategories().subscribe(response => {
      this.categorias = response.body['data']
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectCategoryFormGroup(): void {
    this.categoryFormGroup = this.builder.group({
      categoria: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewCategoryFormGroup(): void {
    this.categoryFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required]),
      code: this.builder.control(null, [Validators.required]),
      description: this.builder.control(null)
    })
  }

  initializeProductFormGroup(): void {
    this.productFormGroup = this.builder.group({
      sku: this.builder.control(null, [Validators.required]),
      name: this.builder.control(null, [Validators.required]),
      freeShipping: this.builder.control(null, [Validators.required]),
      enabled: this.builder.control(null, [Validators.required]),
      image: this.builder.control(null, [Validators.required]),
      description: this.builder.control(null),
      price: this.builder.control(null),
      qty: this.builder.control(null),
      brand: this.builder.control(null),
      model: this.builder.control(null),
      category: this.builder.control(null, [Validators.required])
    })
  }

  newCategory(): void {
    this.isNewCategory = !this.isNewCategory
    this.initializeNewCategoryFormGroup();
  }

  selectCategory(): void {
    this.isNewCategory = !this.isNewCategory
    this.findAllCategories()
    this.initializeSelectCategoryFormGroup()
  }

  nextStep(): void {
    if (this.isNewCategory) {
      this.createNewCategory(this.categoryFormGroup.value)
    } else {
      this.productFormGroup.controls['category'].setValue(this.categoryFormGroup.value['categoria']['_id'])
      this.stepCategoryLabel = `Categoria: ${this.categoryFormGroup.value['categoria']['name']}` 
    }
  }

  createNewCategory(formValueCategory: Categoria): void {
    this.httpRequest = this.categoryService.createNewCategory(formValueCategory).subscribe(response => {
      this.productFormGroup.controls['category'].setValue(response.body['data']['_id'])
      this.stepCategoryLabel = `Categoria: ${response.body['data']['name']}`
      this.toastr.showToastrSuccess(`A categoria ${response.body['data']['name']} foi adicionada com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

  createNewProduct(): void {
    this.httpRequest = this.productService.createNewProduct(this.productFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O produto ${response.body['data']['name']} foi criado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      console.log(err.error['message'])
      this.dialogRef.close(false)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

}
