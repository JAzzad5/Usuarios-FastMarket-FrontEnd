import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient:HttpClient) { }

  obtenerCategorias():Observable<any>{
    return this.httpClient.get('http://localhost:8888/categorias/',{});
  } 
}