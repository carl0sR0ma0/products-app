import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/core/models/categoria.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MyToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  Category: Categoria
  categoryFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Categoria,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCategoryComponent>,
    private toastr: MyToastrService,
    private categoriesService: CategoriesService
  ) { 
    this.Category = data
  }

  ngOnInit(): void {
    this.initializeCategoryFormGroup()
    this.populateCategoryFormGroup()
  }

  ngOnDestroy(): void {
    if (this.httpRequest) {
      this.httpRequest.unsubscribe
    }
  }

  initializeCategoryFormGroup(): void {
    this.categoryFormGroup = this.builder.group({
      code: this.builder.control(null, [Validators.required]),
      description: this.builder.control(null)
    })
  }

  populateCategoryFormGroup(): void {
    this.categoryFormGroup.patchValue({
      code: this.Category['code'],
      description: this.Category['description']
    })
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

  updateCategory(): void {
    this.httpRequest = this.categoriesService.updateCategoryById(this.Category['_id'], this.categoryFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`A Categoria ${this.Category['name']} foi atualizada com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.statu} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}
