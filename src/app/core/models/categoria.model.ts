import { Produto } from "./produto.model";

export interface Categoria {
  _id: String,
  code: String,
  name: String,
  description?: String,
  products: Produto[]
}