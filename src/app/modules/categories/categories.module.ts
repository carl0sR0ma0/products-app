import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ComponentsModule } from './../../components/components.module';
import { NewCategoryComponent } from './new-category/new-category.component';


@NgModule({
  declarations: [CategoriesComponent, CategoryCardComponent, CategoryDetailComponent, NewCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatCardModule,
    ComponentsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CategoriesModule { }
