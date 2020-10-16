import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from "./../core/models/produto.model";
import { API_URL } from "./../core/api";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  findAllProducts(): Observable<HttpResponse<Produto[]>> {
    return this.http.get<Produto[]>(`${API_URL}/produto/listarTodos`, { observe: 'response' })
  }

  findProductByName(productName: String) : Observable<HttpResponse<Produto>> {
    return this.http.get<Produto>(`${API_URL}/produto/listarUm/${productName}`, { observe: 'response' })
  }

  createNewProduct(body: Produto): Observable<HttpResponse<Produto>> {
    return this.http.post<Produto>(`${API_URL}/produto/criar`, body, { observe: 'response'})
  }

  validatorUniqueProductName(productName: string) {
    let myParams = new HttpParams()
    myParams = myParams.append('name', productName)
    return this.http.get<any>(`${API_URL}/produto/validarNomeProduto`, { params: myParams })
  }

  updateProductById(productId: String, body: Produto): Observable<HttpResponse<Produto>> {
    return this.http.put<Produto>(`${API_URL}/produto/atualizar/${productId}`, body, { observe: 'response' })
  }
}
