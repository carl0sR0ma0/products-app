import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';


@NgModule({
  declarations: [CategoriesComponent, CategoryCardComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class CategoriesModule { }
