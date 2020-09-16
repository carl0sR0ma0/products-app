import { Categoria } from "./categoria.model";

export interface Produto {
  _id: String,
  sku: String,
  name: String,
  description?: String,
  price?: Number,
  qty?: Number,
  freeShipping: boolean,
  enabled: boolean,
  brand?: String,
  model?: String,
  image: String,
  category: Categoria
}