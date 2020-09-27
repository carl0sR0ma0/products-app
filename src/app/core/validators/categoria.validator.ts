import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap, first } from "rxjs/operators";
import { CategoriesService } from './../../services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryValidator {
  
  constructor(
    private categoryService: CategoriesService
  ) { }

  validatorUniqueCategoryName(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this.categoryService.validatorUniqueCategoryName(value)),
        map((response) => {
          if (response['data'] == 0 && control.value != null && control.value != '') {
            return null
          } else {
            return {'categoryNameAlreadyExists': true}
          }
        })
      )
  }
}