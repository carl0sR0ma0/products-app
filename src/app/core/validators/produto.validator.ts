import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap, first } from "rxjs/operators";
import { ProductsService } from './../../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductValidator {
  
  constructor(
    private productService: ProductsService
  ) { }

  validatorUniqueProductName(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this.productService.validatorUniqueProductName(value)),
        map((response) => {
          if (response['data'] == 0 && control.value != null && control.value != '') {
            return null
          } else {
            return {'productNameAlreadyExists': true}
          }
        }),
        first()
      )
  }
}