import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../core/models/categoria.model';
import { API_URL } from './../core/api';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  findallCategories(): Observable<HttpResponse<Categoria[]>>{
    return this.http.get<Categoria[]>(`${API_URL}/categoria/listarTodos`, { observe: 'response' })
  }

  findCategoryByName(categoryName: String): Observable<HttpResponse<Categoria>> {
    return this.http.get<Categoria>(`${API_URL}/categoria/listarUm/${categoryName}`, { observe: 'response' })
  }

  createNewCategory(body: Categoria): Observable<HttpResponse<Categoria>> {
    return this.http.post<Categoria>(`${API_URL}/categoria/criar`, body, { observe: 'response'})
  }

  validatorUniqueCategoryName(categoryName: string) {
    let myParams = new HttpParams()
    myParams = myParams.append('name', categoryName)
    return this.http.get<any>(`${API_URL}/categoria/validarNomeCategoria`, { params: myParams})
  }

  updateCategoryById(categoryId: String, body: Categoria): Observable<HttpResponse<Categoria>> {
    return this.http.put<Categoria>(`${API_URL}/categoria/atualizar/${categoryId}`, body, { observe: 'response' })
  }

}
