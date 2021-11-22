import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpClient:HttpClient) { }

  obteneProductos(idComercio:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/comercios/${idComercio}/productos`,{});
  }

  obtenerUnProducto(idProducto:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/productos/${idProducto}`,{});
  }

}
