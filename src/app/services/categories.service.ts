import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  createNewCategory(body: Categoria): Observable<HttpResponse<Categoria>> {
    return this.http.post<Categoria>(`${API_URL}/categoria/criar`, body, { observe: 'response'})
  }
}
