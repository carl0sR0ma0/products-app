import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subscription } from 'rxjs';
import { Categoria } from './../../../core/models/categoria.model';
import { CategoriesService } from './../../../services/categories.service';
import { MyToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  categoryFormGroup: FormGroup
  isNewCategory: boolean = false
  categorias: Categoria[]
  stepCategoryLabel: String = 'Categoria'

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private categoryService: CategoriesService,
    private builder: FormBuilder,
    private toastr: MyToastrService
  ) { }

  ngOnInit(): void {
    this.findAllCategories()
    this.initializeSelectCategoryFormGroup()
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
      // definir o Id no formulário de produtos
      this.stepCategoryLabel = `Categoria: ${this.categoryFormGroup.value['categoria']['name']}` 
    }
  }

  createNewCategory(formValueCategory: Categoria): void {
    this.httpRequest = this.categoryService.createNewCategory(formValueCategory).subscribe(response => {
      //definir o ID no formulário de Produtos
      this.stepCategoryLabel = `Categoria: ${response.body['data']['name']}`
      this.toastr.showToastrSuccess(`A categoria ${response.body['data']['name']} foi adicionada com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

}
