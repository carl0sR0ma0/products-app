import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Categoria } from './../../../core/models/categoria.model';
import { CategoriesService } from './../../../services/categories.service';
import { MyToastrService } from '../../../services/toastr.service';
import { CategoryValidator } from './../../../core/validators/categoria.validator';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  
  stepCategoryLabel: String = 'Categoria'
  categoryFormGroup: FormGroup
  categorias: Categoria[]
  
  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private categoryService: CategoriesService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    private categoryValidator: CategoryValidator
  ) { }

  ngOnInit(): void {
    this.initializeNewCategoryFormGroup()
  }

  ngOnDestroy(): void {[]
    if (this.httpRequest) {
      this.httpRequest.unsubscribe()
    }
  }

  initializeNewCategoryFormGroup(): void {
    this.categoryFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required], this.categoryValidator.validatorUniqueCategoryName()),
      code: this.builder.control(null, [Validators.required]),
      description: this.builder.control(null)
    })
  }

  createNewCategory(): void {
    this.httpRequest = this.categoryService.createNewCategory(this.categoryFormGroup.value).subscribe(response => {      
      this.toastr.showToastrSuccess(`A categoria ${response.body['data']['name']} foi adicionada com sucesso`)
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

  categoryNameExists(): boolean {
    return this.categoryFormGroup.get('name').hasError('categoryNameAlreadyExists')
  }

}
