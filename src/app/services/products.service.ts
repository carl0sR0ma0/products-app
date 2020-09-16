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
}
