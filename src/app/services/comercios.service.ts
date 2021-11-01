import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComerciosService {

  constructor(private httpClient:HttpClient) { }

  obtenerComercios(NombreCategoria:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${NombreCategoria}/comercios`,{});
  };

  obtenerUnComercio(NombreCategoria:any, idComercio:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${NombreCategoria}/${idComercio}`,{});
  };
  
}
