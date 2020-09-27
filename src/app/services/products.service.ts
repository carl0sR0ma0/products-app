import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
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
}
