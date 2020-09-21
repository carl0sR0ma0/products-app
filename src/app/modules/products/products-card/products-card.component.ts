import { Component, OnInit, Input } from '@angular/core';
import { Produto } from "./../../../core/models/produto.model";

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit {

  @Input() produto: Produto

  constructor() { }

  ngOnInit(): void {
  }

  sliceDescriptions(value: String): String {
    return `${value.slice(0, 100)}...`
  }

  verificationFreeShipping(value: boolean): String {
    if (value) {
      return `Frete Grátis`
    } else {
      return `${this.produto.qty}`
    }
  }

}
