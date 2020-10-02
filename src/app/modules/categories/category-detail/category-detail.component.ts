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
    console.log(categoryName)
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
      console.log(this.Categoria);
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

}
