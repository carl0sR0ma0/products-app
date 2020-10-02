import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Categoria } from './../../core/models/categoria.model';
import { CategoriesService } from './../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../categories/new-category/new-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Categorias: Categoria[]

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog
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

  openNewCategoryModal(): void {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newCategoryAdded => {
      if (newCategoryAdded) {
        this.Categorias = undefined
        this.findAllCategories()
      }
    })
  }

}
