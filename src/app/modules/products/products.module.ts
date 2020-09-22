import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsCardComponent } from './products-card/products-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ComponentsModule } from './../../components/components.module';


@NgModule({
  declarations: [ProductsComponent, ProductsCardComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    ComponentsModule
  ]
})
export class ProductsModule { }
