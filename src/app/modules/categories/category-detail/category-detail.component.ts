import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from './../../../services/categories.service';
import { Categoria } from './../../../core/models/categoria.model';
import { Produto } from 'src/app/core/models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { MyToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Categoria: Categoria
  hasError: boolean = false
  categoryName: String

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesSevice: CategoriesService,
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.categoryName = this.activatedRoute.snapshot.params['categoryName']    
    this.findCategoryByName(this.categoryName)
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

  openUpdateCategoryModal(): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: this.Categoria
    })

    dialogRef.afterClosed().subscribe(updatedCategory => {
      if (updatedCategory) {
        this.Categoria = undefined
        this.findCategoryByName(this.categoryName)
      }
    })
  }

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '200px',
      data: `Deseja apagar a categoria ${this.Categoria['name']} ? Ao apagar a categoria automaticamente vc apagará todos produtos vinculados à ele !!!`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteCategory(this.Categoria['_id'])
      }
    })
  }

  deleteCategory(categoryId: String): void {
    this.httpRequest = this.categoriesSevice.deleteCategoryById(categoryId).subscribe(response => {
      this.toastr.showToastrSuccess(`A Categoria ${this.Categoria['name']} foi apagada com sucesso`)
      this.route.navigate(['/categories'])
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
