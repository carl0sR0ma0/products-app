import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Categoria } from './../../core/models/categoria.model';
import { CategoriesService } from './../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Categorias: Categoria[]

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.findAllCategories()
  }

  ngOnDestroy(): void {
    if(this.httpRequest){
      this.httpRequest.unsubscribe();
     } 

  }

  findAllCategories(): void {
    this.httpRequest = this.categoriesService.findallCategories().subscribe(response => {
      this.Categorias = response.body['data']      
    }, err => {
      console.log(err)
    })
  }

}
