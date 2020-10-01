import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from './../../../core/models/categoria.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() Categoria: Categoria

  constructor() { }

  ngOnInit(): void {
  }

}
