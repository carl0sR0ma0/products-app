import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from './../../../services/categories.service';
import { Categoria } from './../../../core/models/categoria.model';
import { Produto } from 'src/app/core/models/produto.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Categoria: Categoria
  hasError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesSevice: CategoriesService
  ) { }

  ngOnInit(): void {
    const categoryName = this.activatedRoute.snapshot.params['categoryName']    
    this.findCategoryByName(categoryName)
  }

  ngOnDestroy(): void {
    if (this.httpRequest) {
      this.httpRequest.unsubscribe()
    }
  }

  findCategoryByName(categoryName: String): void {
    this.httpRequest = this.categoriesSevice.findCategoryByName(categoryName).subscribe(response => {
      this.Categoria = response.body['data']      
    }, err => {
      this.hasError = true
    })
  }

  verificationFreeShipping(value: boolean): String {
    if (value) {
      return `Frete Grátis`
    } else {
      return `Frete: R$100,00`
    }
  }

  countProductsOnCategory(nProducts: Number): String {
    return nProducts > 1 ? `${nProducts} produtos cadastrados` : `${nProducts} produto cadastrado`
  }

  nameProductOnCateogory(nProducts: Number): String {
    if (nProducts > 1) {
      return 'Produtos dessa categoria'
    } else if (nProducts == 1) {
      return 'Produto dessa categoria'
    } else {
      return 'Não há produtos nessa categoria'
    }
  }

}
