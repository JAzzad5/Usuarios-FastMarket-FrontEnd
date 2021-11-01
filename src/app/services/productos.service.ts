import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpClient:HttpClient) { }

  obteneProductos(Categoria:any, idComercio:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${Categoria}/${idComercio}/productos`,{});
  }
}
