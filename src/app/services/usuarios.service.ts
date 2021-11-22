import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient) { }

  obtenerUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}`,{});
  }

  obtenerCarritoUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}/carrito`,{});
  }
}
